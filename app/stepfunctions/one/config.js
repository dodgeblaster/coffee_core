module.exports = {
    permissions: [
        {
            Action: ['dynamodb:*'],
            Resource:
                'arn:aws:dynamodb:{@region}:{@accountId}:table/CoffeeCore{@stage}'
        }
    ],
    substitution: {
        DDBTable: 'CoffeeCore{@stage}'
    },
    trigger: 'sonic2{@stage}_orderStatusUpdated'
}
