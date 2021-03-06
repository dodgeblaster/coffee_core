module.exports = {
    permissions: [
        {
            Action: '*',
            Resource: '*'
        }
    ],
    env: {},
    trigger: 'sonic2{@stage}_paymentStarted',
    dashboard: {
        doc: `This is a description of this lambda function`,
        invocationAlarm: 0,
        invocationGoal: 10,
        errorGoal: 0,
        errorAlarm: 2,
        durationAlarm: 20000,
        durationGoal: 1000
    },
    alarm: {
        threshold: 2,
        snsTopic: 'arn:aws:sns:{@region}:{@accountId}:ChatOpsTopic'
    }
}
