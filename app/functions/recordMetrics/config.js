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
    trigger: 'sonic2{@stage}_orderCompleted',
    dashboard: {
        doc: `This is a description of this lambda function`
    },
    alarm: {
        threshold: 2,
        snsTopic: 'arn:aws:sns:us-east-1:251256923172:ChatOpsTopic'
    }
}
