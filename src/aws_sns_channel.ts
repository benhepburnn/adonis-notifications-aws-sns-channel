import { Notification, NotificationChannel } from '@benhepburn/adonis-notifications'
import { PublishCommand, SNSClient, SNSClientConfig } from '@aws-sdk/client-sns'
import config from '@adonisjs/core/services/config'
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'

export class AwsSnsChannel extends NotificationChannel {
  client: SNSClient

  constructor() {
    super()

    this.client = new SNSClient(this.buildAwsConfig())
  }

  async send(notification: Notification): Promise<any> {
    const smsMessage = notification.toSms()

    const command = new PublishCommand({
      Message: smsMessage.message,
      PhoneNumber: smsMessage.to,
    })

    return this.client.send(command)
  }

  private buildAwsConfig(): SNSClientConfig {
    let credentials: any = {
      aws_access_key_id: config.get('channel_aws_sns.awsAccessKeyId'),
      aws_secret_access_key: config.get('channel_aws_sns.awsSecretAccessKey'),
      aws_session_token: config.get('channel_aws_sns.awsSessionToken'),
    }

    if (!(credentials.aws_access_key_id && credentials.aws_secret_access_key))
      credentials = fromNodeProviderChain()

    return {
      region: config.get('channel_aws_sns.awsRegion'),
      credentials,
    }
  }
}
