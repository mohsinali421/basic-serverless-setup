import type { Serverless } from 'serverless/aws'
const REGION = 'ap-south-1'
const PROFILE = 'my_aws_profile'
const serverlessConfiguration: Serverless = {
  service: 'local-get-lambda-name',
  frameworkVersion: '>=1.72.0',
  custom: {
    webpack: {
      webpackConfig: './local.webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    timeout: 120,
    region: REGION,
    profile: PROFILE,
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '0',
      CORS_ORIGIN_WHITELIST: 'http://localhost:3000,http://localhost:3001',
    },
  },
  functions: {
    lambdaName: {
      handler: 'src/lambdaname/index.handler',
      events: [
        {
          http: {
            method: 'get',
            path: 'getlambdaname',
            cors: true,
          },
        },
      ],
    },
  },
}

module.exports = serverlessConfiguration
