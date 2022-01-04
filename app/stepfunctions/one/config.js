module.exports = {
    permissions: [
        {
            Action: ['dynamodb:*'],
            Resource:
                'arn:aws:dynamodb:{@region}:{@accountId}:table/CoffeeCore-{@stage}'
        }
    ],
    substitution: {
        Table: 'CoffeeCore-{@stage}'
    },
    trigger: 'sonic2{@stage}_orderStatusUpdated'
}
