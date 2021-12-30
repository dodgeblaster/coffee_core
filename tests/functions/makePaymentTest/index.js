const AWS = require('aws-sdk')
const assert = require('assert')

async function reportTestFail(props) {
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
        codepipeline.putJobFailureResult(params, function (err, data) {
            context.fail(props.message)
        })
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

        const result = JSON.parse(res.Payload)

        assert.equal(result.id, '100')
        assert.equal(result.storeId, '200')
        assert.equal(result.products, 'mock_products')

        await putJobSuccess({
            event,
            context
        })

        return 'Success'
    } catch (e) {
        await reportTestFail({
            event,
            context,
            message: e.message
        })
        throw new Error(e)
    }
}
