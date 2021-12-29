const AWS = require('aws-sdk')
const assert = require('assert')

async function putJobFailure(props) {
    const codepipeline = new AWS.CodePipeline()
    if (props.event['CodePipeline.job']) {
        const jobId = props.event['CodePipeline.job'].id

        const params = {
            jobId: jobId,
            failureDetails: {
                message: JSON.stringify(props.message),
                type: 'JobFailed',
                externalExecutionId: props.context.awsRequestId
            }
        }
        await codepipeline.putJobFailureResult(params)
        return props.message
    }
}

async function putJobSuccess(props) {
    const codepipeline = new AWS.CodePipeline()

    if (props.event['CodePipeline.job']) {
        const jobId = props.event['CodePipeline.job'].id

        const params = {
            jobId: jobId
        }
        await codepipeline.putJobSuccessResult(params).promise()
    }
}

async function invoke(name, input) {
    const lambda = new AWS.Lambda()
    const params = {
        FunctionName: name,
        LogType: None | Tail,
        Payload: JSON.stringify({
            ...input
        })
    }
    return await lambda.invoke(params).promise()
}

module.exports.handler = async (event, context) => {
    try {
        const res = await invoke('coffeecore-makePayment-dev', {
            detail: {
                synth: true,
                id: '100',
                amount: 400,
                storeId: '200',
                products: 'mock_products'
            }
        })

        assert.equal(res.id, '100')
        assert.equal(res.storeId, '200')
        assert.equal(res.products, 'mock_products')

        await putJobSuccess({
            event,
            context
        })
    } catch (e) {
        await putJobFailure({
            event,
            context,
            message: e.message
        })
    }
}
