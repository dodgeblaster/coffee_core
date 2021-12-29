const AWS = require('aws-sdk')
const eventbridge = new AWS.EventBridge({
    region: 'us-east-1'
})

const emit = async (event, input) => {
    const params = {
        Entries: [
            {
                Detail: JSON.stringify(input),
                DetailType: event,
                EventBusName: 'default',
                Source: `custom.coffeecore`,
                Time: new Date()
            }
        ]
    }

    await eventbridge.putEvents(params).promise()
}

const wait = () => new Promise((r) => setTimeout(r, 2000))

const makePayment = async (e) => {
    if (e.synth) {
        // do a bunch of logic...
        console.log('payment started')
        await wait()
    } else {
        // do a bunch of logic...
        console.log('payment started')
        await wait()
    }
}

module.exports.handler = async (e) => {
    await makePayment(e)
    await emit('paymentCompleted', {
        id: e.detail.id,
        storeId: e.detail.storeId,
        status: 'SUCCESS',
        statusDetails: 'Payment went thru',
        products: e.detail.products
    })
    return {
        id: e.detail.id,
        storeId: e.detail.storeId,
        status: 'SUCCESS',
        statusDetails: 'Payment went thru',
        products: e.detail.products
    }
}
