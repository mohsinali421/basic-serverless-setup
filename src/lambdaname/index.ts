import { APIGatewayProxyEvent, Context, Handler } from 'aws-lambda'

export const handler: Handler = async function (event: APIGatewayProxyEvent, context: Context) {
  return {
    statusCode: 200,
    headers: {},
    body: JSON.stringify(`hello there from ${context.functionName}`, null, 2),
  }
}
