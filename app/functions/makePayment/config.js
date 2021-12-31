module.exports = {
    permissions: [
        {
            Action: '*',
            Resource: '*'
        }
    ],
    env: {},
    trigger: 'sonic2{@stage}_paymentStarted', // use , instead of _
    dashboard: {
        doc: `This is a description of this lambda function`,
        invocationAlarm: 0,
        invocationGoal: 10,
        errorAlarm: 2,
        durationAlarm: 20000,
        durationGoal: 1000
    },
    alarm: {
        threshold: 2,
        snsTopic: 'arn:aws:sns:us-east-1:251256923172:ChatOpsTopic'
    }
}
