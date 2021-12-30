module.exports = {
    permissions: [
        {
            Action: ['cloudwatch:PutMetricData'],
            Resource: '*'
        },
        {
            Action: ['dynamodb:*'],
            Resource:
                'arn:aws:dynamodb:{@region}:251256923172:table/CoffeeCore-{@stage}'
        }
    ],
    env: {
        DB: 'CoffeeCore-{@stage}'
    },
    trigger: 'sonic2{@stage}_orderCompleted'
}
