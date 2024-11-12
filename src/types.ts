export type NotificationsAwsSnsChannelConfig = {
  awsRegion: string
  awsAccessKeyId?: string
  awsSecretAccessKey?: string
  awsSessionToken?: string
}

export type SnsSmsMessage = {
  message: string
  to: string
}

export interface SnsSmsNotification {
  toSnsSms: () => SnsSmsMessage
}

export interface NotifiableSnsPush {
  notificationGetSnsTargetArn(): string | undefined
  notificationGetSnsTopicArn(): string | undefined
}

export type SnsPushMessage = {
  message: string
  targetArn?: string
  topicArn?: string
}

export interface SnsPushNotification {
  toSnsPushNotification: () => SnsPushMessage
}
