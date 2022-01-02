module.exports = {
    // permissions: [
    //     {
    //         Action: 'lambda:*',
    //         Resource: '*'
    //     },
    //     {
    //         Action: [
    //             'codepipeline:PutJobFailureResult',
    //             'codepipeline:PutJobSuccessResult'
    //         ],
    //         Resource: '*'
    //     }
    // ],
    env: {
        FUNCTION: 'coffeecorestaging-makePayment-staging'
    },
    timeout: 900
}
