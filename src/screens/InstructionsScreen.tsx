// src/screens/InstructionsScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Surface, useTheme } from 'react-native-paper';
import Footer from '../components/Footer';

const CodeBlock = ({ children }: { children: string }) => {
  return (
    <Surface style={styles.codeBlock} elevation={1}>
      <Text variant="bodySmall" style={styles.codeText}>
        {children}
      </Text>
    </Surface>
  );
};

export default function InstructionsScreen({ onBack }: { onBack: () => void }) {
  const theme = useTheme();

  const userPolicy = `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ListAndDescribeOrganization",
            "Effect": "Allow",
            "Action": [
                "organizations:ListAccounts",
                "organizations:DescribeOrganization"
            ],
            "Resource": "*"
        },
        {
            "Sid": "AssumeRoleInSubAccounts",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::*:role/OrganizationAccountAccessRole"
        }
    ]
}`;

  const rolePolicy = `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "ec2:DescribeInstances",
            "Resource": "*"
        }
    ]
}`;

  const trustPolicy = `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::YOUR_MANAGEMENT_ACCOUNT_ID:root"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}`;

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.title}>How to Use</Text>
        </View>

        <Text variant="titleLarge" style={styles.heading}>Part 1: AWS Setup</Text>
        <Text variant="bodyMedium" style={styles.step}>1. In your AWS Management (Root) Account, create a new IAM User.</Text>
        <Text variant="bodyMedium" style={styles.step}>2. Attach this permissions policy to the user. You will use this user's credentials to log in.</Text>
        <CodeBlock>{userPolicy}</CodeBlock>

        <Text variant="bodyMedium" style={styles.step}>3. In EACH sub-account, create an IAM Role named exactly `OrganizationAccountAccessRole`.</Text>
        <Text variant="bodyMedium" style={styles.step}>4. Attach this permissions policy to that role:</Text>
        <CodeBlock>{rolePolicy}</CodeBlock>

        <Text variant="bodyMedium" style={styles.step}>5. Set the role's "Trust Relationship". Replace `YOUR_MANAGEMENT_ACCOUNT_ID` with your actual 12-digit root account ID.</Text>
        <CodeBlock>{trustPolicy}</CodeBlock>

        <Text variant="titleLarge" style={styles.heading}>Part 2: Using the App</Text>
        <Text variant="bodyMedium" style={styles.step}>1. Enter the Access Key and Secret Key from the IAM User you created in Part 1.</Text>
        <Text variant="bodyMedium" style={styles.step}>2. On the dashboard, tap the header icons to refresh data, change regions, or log out.</Text>
        <Text variant="bodyMedium" style={styles.step}>3. Tap the `Root Region` button to set your AWS Organization's primary region (usually us-east-1).</Text>
        
        <Button mode="contained" onPress={onBack} style={styles.backButton}>
          Back to Login
        </Button>
        <Footer />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: { 
    paddingVertical: 10,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center'
  },
  heading: { 
    marginTop: 25, 
    marginBottom: 15,
  },
  step: { 
    marginBottom: 15, 
    lineHeight: 22,
  },
  codeBlock: { 
    padding: 15, 
    borderRadius: 8, 
    marginVertical: 10,
  },
  codeText: { 
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  backButton: {
    marginTop: 30,
  }
});