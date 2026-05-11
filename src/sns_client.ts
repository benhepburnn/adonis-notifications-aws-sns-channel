import app from '@adonisjs/core/services/app'
import { SNSClient, SNSClientConfig } from '@aws-sdk/client-sns'
import { buildAwsCredentials } from './aws_credentials.js'

let snsClient: SNSClient

await app.booted(async (resolver) => {
  snsClient = new SNSClient(buildAwsConfig(resolver.config))
})

function buildAwsConfig(config: any): SNSClientConfig {
  return {
    region: config.get('sns.awsRegion'),
    credentials: buildAwsCredentials(config),
  }
}

export { snsClient }
