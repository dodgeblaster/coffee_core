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
        invocationAlarm: 0,
        invocationGoal: 10,
        errorAlarm: 2,
        durationAlarm: 20000,
        durationGoal: 1000
    }
}
