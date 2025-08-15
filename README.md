EC2 Tracker Mobile App ☁️

A sleek and modern React Native application for tracking the real-time status of your AWS EC2 instances across multiple accounts and regions. Built with a focus on a clean user experience, security, and modern development practices.

## ✨ Features

- Multi-Account Tracking: Securely connect to your AWS Organisation and monitor instances across all sub-accounts.

- Multi-Region Selection: A user-friendly interface to select and scan specific AWS regions for EC2 instances.

- Secure Credential Storage: Uses expo-secure-store to safely store AWS credentials on your device.

- Modern UI: Built with React Native Paper, providing a beautiful and consistent UI that automatically adapts to your device's light and dark modes.

- Custom Theming & Fonts: A fully customised theme with the "Inter" font family for excellent readability and a professional feel.

- Animated Login Screen: A beautiful, animated gradient background on the login screen for a polished first impression.

- Built-in Instructions: A dedicated screen that guides users through the necessary AWS setup.

## 🛠️ Tech Stack
```
Framework: React Native (with Expo)

UI Kit: React Native Paper

State Management: React Hooks

AWS Integration: AWS SDK for JavaScript v3

Local Storage: Expo Secure Store

Fonts: Expo Google Fonts (Inter)

Gradients: Expo Linear Gradient
```

## 🏁 Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

#### Prerequisites
```
- Node.js (LTS version recommended)
- Expo CLI
- Bash
- npm install -g expo-cli
- An active AWS account with an AWS Organisation setup.
```

#### Installation
Clone the repository:

```Bash
git clone https://github.com/your-username/ec2-tracker-app.git
cd ec2-tracker-app
```
Install NPM packages:
```Bash
npm install
```
Run the app:

To run on an emulator or simulator:
```Bash
npx expo run:android
npx expo run:ios
```

Or, to run with the Expo Go app:
```Bash
npx expo start
```

## 🔐 AWS Configuration
To use this app, you must configure specific IAM permissions in your AWS environment.

1. In Your Management (Root) Account

Create an IAM User with the following permissions policy. The app will use this user's credentials.
```JSON
{
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
}
```
2. In EACH Sub-Account

In every sub-account you want to monitor, create an IAM Role with the following configuration:

Role Name: OrganizationAccountAccessRole (must be exact)

Permissions Policy:
```JSON
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "ec2:DescribeInstances",
            "Resource": "*"
        }
    ]
}
```
##### Trust Relationship: (Replace YOUR_MANAGEMENT_ACCOUNT_ID with your 12-digit root account ID)
```JSON
{
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
}
```

## 📱 How to Use the App
Login: Enter the Access Key ID and Secret Access Key from the IAM user you created in your management account.

Set Root Region: On the dashboard, tap the Root Region button to select the AWS region where your AWS Organization is managed (typically us-east-1).

Select EC2 Regions: Tap the map marker icon in the header to select all the regions where your EC2 instances are running.

View Status: The dashboard will now display all discovered accounts and the status of their respective EC2 instances.

Refresh: Tap the refresh icon in the header at any time to get the latest instance statuses.
