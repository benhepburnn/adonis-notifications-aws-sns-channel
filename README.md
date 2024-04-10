# AdonisJS Notifications - AWS SNS Channel

This package requires @benhepburn/adonis-notifications and @aws-sdk/credential-providers.

## Install

Install peer dependency @aws-sdk/credential-providers and this package from npm:

```sh
npm install @aws-sdk/credential-providers @benhepburn/adonis-notifications-aws-sns-channel
```

or

```sh
pnpm install @aws-sdk/credential-providers @benhepburn/adonis-notifications-aws-sns-channel
```

or

```sh
yarn add @aws-sdk/credential-providers @benhepburn/adonis-notifications-aws-sns-channel
```

Then, configure the package for Adonis:

```sh
node ace configure @benhepburn/adonis-notifications-aws-sns-channel
```

## Configuration

Edit config/aws_sns_channel.ts as needed, then add the channel to config/notifications.ts.

You must set the AWS region:
```dotenv
AWS_SNS_REGION=<region e.g. ap-southeast-2>
```

You can set the AWS credentials in your .env file; if they aren't set then
the default node credentials provider for AWS will be used.
