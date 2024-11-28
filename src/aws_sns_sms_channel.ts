import { Notification, NotificationChannel } from '@benhepburn/adonis-notifications'
import { PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns'
import { SnsSmsNotification } from './types.js'
import { snsClient } from './sns_client.js'
import { NotifiableMobile } from '@benhepburn/adonis-notifications/types'

export class AwsSnsSmsChannel extends NotificationChannel {
  constructor() {
    super()
  }

  async send(notification: Notification<NotifiableMobile> & SnsSmsNotification): Promise<any> {
    const snsMessage = notification.toSnsSms()

    const to = Array.isArray(snsMessage.to) ? snsMessage.to : [snsMessage.to]

    const results: PublishCommandOutput[] = []
    for (const PhoneNumber of to) {
      const command = new PublishCommand({
        Message: snsMessage.message,
        PhoneNumber,
      })

      results.push(await snsClient.send(command))
    }

    return results
  }
}
