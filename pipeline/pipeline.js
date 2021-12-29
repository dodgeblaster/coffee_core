module.exports = {
    name: 'coffee-core-pipeline',
    stages: [
        {
            name: 'source',
            actions: [
                {
                    type: 'SOURCE',
                    name: 'source',
                    repo: 'coffee_core',
                    owner: 'dodgeblaster',
                    outputArtifact: 'sourceZip'
                }
            ]
        },
        {
            name: 'Staging',
            actions: [
                {
                    type: 'BUILD',
                    name: 'Deploy',
                    script: '/deploy.yml',
                    env: {
                        STAGE: 'test'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'buildZip'
                },
                {
                    type: 'INVOKE',
                    name: 'Test',
                    functionName: 'coffeecoretests-makePaymentTest-dev',
                    region: 'us-east-1'
                }
            ]
        }
    ]
}
