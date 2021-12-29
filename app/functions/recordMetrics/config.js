module.exports = {
    permissions: [
        {
            Action: ['cloudwatch:PutMetricData'],
            Resource: '*'
        },
        {
            Action: ['dynamodb:Query'],
            Resource: '*'
        }
    ],
    env: {
        DB: 'sonic2dev'
    },
    trigger: 'sonic2dev_orderCompleted'
}
