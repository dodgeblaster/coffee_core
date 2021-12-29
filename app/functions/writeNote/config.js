module.exports = {
    permissions: [
        {
            Action: '*',
            Resource: '*'
        }
    ],
    env: {},
    trigger: 'sonic2dev_paymentStarted' // use , instead of _
}
