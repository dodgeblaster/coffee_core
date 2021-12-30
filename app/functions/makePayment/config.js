module.exports = {
    permissions: [
        {
            Action: '*',
            Resource: '*'
        }
    ],
    env: {},
    trigger: 'sonic2{@stage}_paymentStarted' // use , instead of _
}
