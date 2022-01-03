/**
 * Permissions for Lambda Function
 */
const permissions = [
    {
        Action: ['cloudwatch:PutMetricData'],
        Resource: '*'
    },
    {
        Action: ['dynamodb:*'],
        Resource:
            'arn:aws:dynamodb:{@region}:{@accountId}:table/CoffeeCore-{@stage}'
    }
]

/**
 * Environment Variables for Lambda Function
 */
const env = {
    DB: 'CoffeeCore-{@stage}'
}

/**
 * Dashboard configuration for Lambda Function
 */
const dashboard = {
    doc: `# Record Payments
This is a description of this lambda function
`
}

/**
 * Alarm configuration for Lambda Function
 */
const alarm = {
    threshold: 2,
    snsTopic: 'arn:aws:sns:{@region}:{@accountId}:ChatOpsTopic'
}

module.exports = {
    permissions,
    env,
    trigger: 'sonic2{@stage}_orderCompleted',
    dashboard,
    alarm
}
