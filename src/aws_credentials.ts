import { fromNodeProviderChain, fromTemporaryCredentials } from '@aws-sdk/credential-providers'

export type AwsCredentialsConfig = {
  awsAccessKeyId?: string
  awsSecretAccessKey?: string
  awsSessionToken?: string
  awsRoleArn?: string
}

export function buildAwsCredentials(config: AwsCredentialsConfig): any {
  if (config.awsAccessKeyId && config.awsSecretAccessKey) {
    return {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccessKey,
      sessionToken: config.awsSessionToken,
    }
  }

  if (config.awsRoleArn) {
    return fromTemporaryCredentials({
      params: {
        RoleArn: config.awsRoleArn,
      },
      masterCredentials: fromNodeProviderChain(),
    })
  }

  return fromNodeProviderChain()
}
