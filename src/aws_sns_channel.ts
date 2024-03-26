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
      accessKeyId: config.get('channel_aws_sns.awsAccessKeyId'),
      secretAccessKey: config.get('channel_aws_sns.awsSecretAccessKey'),
      sessionToken: config.get('channel_aws_sns.awsSessionToken'),
    }

    if (!(credentials.accessKeyId && credentials.secretAccessKey))
      credentials = fromNodeProviderChain()

    return {
      region: config.get('channel_aws_sns.awsRegion'),
      credentials,
    }
  }
}
