// src/services/aws.ts
import { 
  OrganizationsClient, 
  ListAccountsCommand,
  DescribeOrganizationCommand // <-- 1. Import new command
} from "@aws-sdk/client-organizations";
import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { getCredentials } from './credentials';

export const fetchAllInstanceData = async (rootRegion: string, ec2Regions: string[]) => {
  const rootCredentials = await getCredentials();
  if (!rootCredentials) throw new Error("No credentials stored.");

  const orgClient = new OrganizationsClient({ region: rootRegion, credentials: rootCredentials });

  // --- 2. Get organization details to find the management account ID ---
  const orgDetails = await orgClient.send(new DescribeOrganizationCommand({}));
  const managementAccountId = orgDetails.Organization?.MasterAccountId;
  
  const accounts = await orgClient.send(new ListAccountsCommand({}));
  const allAccountsData = [];

  for (const account of accounts.Accounts || []) {
    // --- 3. Add check to filter out the management account ---
    if (account.Id === managementAccountId) {
      continue; // Skip to the next iteration
    }

    if (account.Status !== 'ACTIVE') {
      console.log(`Skipping suspended account: ${account.Name} (${account.Id})`);
      continue;
    }

    const accountInstances = [];

    for (const region of ec2Regions) {
      try {
        const stsClient = new STSClient({ region, credentials: rootCredentials });
        const assumeRoleResponse = await stsClient.send(new AssumeRoleCommand({
          RoleArn: `arn:aws:iam::${account.Id}:role/OrganizationAccountAccessRole`,
          RoleSessionName: "EC2TrackerAppSession"
        }));

        const creds = assumeRoleResponse.Credentials;

        if (creds && creds.AccessKeyId && creds.SecretAccessKey && creds.SessionToken) {
          const tempCredentials = {
            accessKeyId: creds.AccessKeyId,
            secretAccessKey: creds.SecretAccessKey,
            sessionToken: creds.SessionToken,
          };

          const ec2Client = new EC2Client({ region, credentials: tempCredentials });
          const instancesResult = await ec2Client.send(new DescribeInstancesCommand({}));

          const instancesInRegion = (instancesResult.Reservations || []).flatMap(
              (reservation) => reservation.Instances || []
          ).map(instance => ({
              id: instance.InstanceId,
              state: instance.State?.Name,
              region: region,
          }));

          accountInstances.push(...instancesInRegion);

        } else {
          console.error(`Could not get complete credentials for account ${account.Id} in region ${region}. Skipping.`);
        }
      } catch (error) {
        console.error(`Error processing account ${account.Id} in region ${region}:`, error);
      }
    }

    allAccountsData.push({
      accountName: account.Name,
      accountId: account.Id,
      instances: accountInstances,
    });
  }
  return allAccountsData;
};