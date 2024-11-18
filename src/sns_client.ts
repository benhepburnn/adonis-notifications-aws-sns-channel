import app from '@adonisjs/core/services/app'
import { SNSClient, SNSClientConfig } from '@aws-sdk/client-sns'
import { fromNodeProviderChain } from '@aws-sdk/credential-providers'

let snsClient: SNSClient

await app.booted(async (resolver) => {
  snsClient = new SNSClient(buildAwsConfig(resolver.config))
})

function buildAwsConfig(config: any): SNSClientConfig {
  let credentials: any = {
    accessKeyId: config.get('sns.awsAccessKeyId'),
    secretAccessKey: config.get('sns.awsSecretAccessKey'),
    sessionToken: config.get('sns.awsSessionToken'),
  }

  if (!(credentials.accessKeyId && credentials.secretAccessKey))
    credentials = fromNodeProviderChain()

  return {
    region: config.get('sns.awsRegion'),
    credentials,
  }
}

export { snsClient }
