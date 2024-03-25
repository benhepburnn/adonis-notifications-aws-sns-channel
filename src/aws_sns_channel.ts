import { Notification } from '@benhepburn/adonis-notifications'
import { NotificationChannel } from '@benhepburn/adonis-notifications'

export default class AwsSnsChannel extends NotificationChannel {
  send(notification: Notification): Promise<void> {
    const smsMessage = notification.toSms()
  }
}
