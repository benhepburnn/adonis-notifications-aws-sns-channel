import { Notification, NotificationChannel } from '@benhepburn/adonis-notifications'
import { PublishCommand } from '@aws-sdk/client-sns'
import { NotifiableSnsPush, SnsPushNotification } from './types.js'
import { snsClient } from './sns_client.js'

export class AwsSnsPushNotificationsChannel extends NotificationChannel {
  constructor() {
    super()
  }

  async send(notification: Notification<NotifiableSnsPush> & SnsPushNotification): Promise<any> {
    const snsMessage = notification.toSnsPushNotification()

    const command = new PublishCommand({
      // @ts-ignore
      Message: snsMessage.message,
      MessageStructure: 'json',
      TargetArn: snsMessage.targetArn,
      TopicArn: snsMessage.topicArn,
    })

    return snsClient.send(command)
  }
}
