import { Notification, NotificationChannel } from '@benhepburn/adonis-notifications'
import { PublishCommand } from '@aws-sdk/client-sns'
import { SnsSmsNotification } from './types.js'
import { snsClient } from './sns_client.js'

export class AwsSnsSmsChannel extends NotificationChannel {
  constructor() {
    super()
  }

  async send(notification: Notification & SnsSmsNotification): Promise<any> {
    const snsMessage = notification.toSnsSms()

    const command = new PublishCommand({
      Message: snsMessage.message,
      PhoneNumber: snsMessage.to,
    })

    return snsClient.send(command)
  }
}
