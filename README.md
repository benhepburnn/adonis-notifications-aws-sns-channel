# AdonisJS Notifications AWS SNS Channel

An AWS SNS SMS channel for [`@benhepburn/adonis-notifications`](https://www.npmjs.com/package/@benhepburn/adonis-notifications) in AdonisJS v6 applications.

The channel sends SMS messages through AWS SNS. Email and other SNS delivery types are not implemented.

## Requirements

- Node.js 20 or newer
- AdonisJS v6
- `@benhepburn/adonis-notifications`
- AWS credentials with permission to publish SMS messages through SNS

## Installation

Install the notifications package, AWS credential provider peer dependency, and this channel:

```sh
npm install @benhepburn/adonis-notifications @aws-sdk/credential-providers @benhepburn/adonis-notifications-aws-sns-channel
```

```sh
pnpm add @benhepburn/adonis-notifications @aws-sdk/credential-providers @benhepburn/adonis-notifications-aws-sns-channel
```

```sh
yarn add @benhepburn/adonis-notifications @aws-sdk/credential-providers @benhepburn/adonis-notifications-aws-sns-channel
```

Configure the base notifications package if you have not already done so:

```sh
node ace configure @benhepburn/adonis-notifications
```

Then configure the SNS channel:

```sh
node ace configure @benhepburn/adonis-notifications-aws-sns-channel
```

The configure command creates `config/sns.ts` and adds `AWS_SNS_REGION` to your environment validation.

## Configuration

Set the AWS region in your `.env` file:

```dotenv
AWS_SNS_REGION=ap-southeast-2
```

The generated `config/sns.ts` reads these optional environment variables as well:

```dotenv
AWS_SNS_ACCESS_KEY_ID=
AWS_SNS_SECRET_ACCESS_KEY=
AWS_SNS_SESSION_TOKEN=
AWS_SNS_ROLE_ARN=
```

Credentials are resolved in this order:

1. `AWS_SNS_ACCESS_KEY_ID` and `AWS_SNS_SECRET_ACCESS_KEY`, with optional `AWS_SNS_SESSION_TOKEN`
2. `AWS_SNS_ROLE_ARN`, using the AWS SDK node provider chain as the master credentials
3. The default AWS SDK node provider chain

## Register the Channel

Add `AwsSnsSmsChannel` to `config/notifications.ts`. The key you choose is the channel name your notifications return from `via()`.

```ts
import { defineConfig } from '@benhepburn/adonis-notifications'
import { AwsSnsSmsChannel } from '@benhepburn/adonis-notifications-aws-sns-channel'

const notificationsConfig = defineConfig({
  channels: {
    sms: AwsSnsSmsChannel,
  },
})

export default notificationsConfig
```

## Create an SMS Notification

A notification must extend `Notification`, return the configured channel key from `via()`, and implement `toSnsSms()`.

```ts
import { Notification } from '@benhepburn/adonis-notifications'
import { SnsSmsNotification } from '@benhepburn/adonis-notifications-aws-sns-channel/types'

type User = {
  notificationGetMobile(): string
}

export class VerificationCodeNotification
  extends Notification<User>
  implements SnsSmsNotification
{
  constructor(private code: string) {
    super()
  }

  via() {
    return ['sms']
  }

  toSnsSms() {
    return {
      to: this.notifiable!.notificationGetMobile(),
      message: `Your verification code is ${this.code}`,
      from: 'MyApp',
    }
  }
}
```

The `toSnsSms()` method returns:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `message` | `string` | Yes | SMS body sent as the SNS `Message`. |
| `to` | `string \| string[]` | Yes | One phone number or many phone numbers. The channel publishes one SNS message per phone number. |
| `from` | `string` | No | Sender ID sent as the `AWS.SNS.SMS.SenderID` message attribute. Availability depends on the destination country and AWS account settings. |

Send the notification with the base notifications service:

```ts
import notifications from '@benhepburn/adonis-notifications/services/main'

await notifications.sendNotification(user, new VerificationCodeNotification('123456'))
```

## AWS Notes

- Use E.164 formatted phone numbers, for example `+61400111222`.
- AWS SNS SMS delivery, origination identities, sandbox status, and Sender ID support vary by country and account.
- The channel returns an array of AWS SNS `PublishCommandOutput` values for each configured recipient.

## Development

```sh
npm run typecheck
npm run lint
npm run build
```

The package entry point exports:

- `configure`
- `defineConfig`
- `AwsSnsSmsChannel`

The package also exports its channel types from:

```ts
import type {
  NotificationsAwsSnsChannelConfig,
  SnsSmsMessage,
  SnsSmsNotification,
} from '@benhepburn/adonis-notifications-aws-sns-channel/types'
```

## License

MIT
