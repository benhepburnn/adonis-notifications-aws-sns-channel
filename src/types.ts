export type NotificationsAwsSnsChannelConfig = {
  awsRegion: string
  awsAccessKeyId?: string
  awsSecretAccessKey?: string
  awsSessionToken?: string
  awsRoleArn?: string
}

export type SnsSmsMessage = {
  message: string
  to: string | string[]
  from?: string
}

export interface SnsSmsNotification {
  toSnsSms: () => SnsSmsMessage
}
