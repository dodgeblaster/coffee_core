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
                        STAGE: 'test',
                        CANARY: 'off'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'buildZip'
                },
                {
                    type: 'INVOKE',
                    name: 'Test',
                    functionName: 'coffeecoretests-makePaymentTest-test',
                    region: 'us-east-1'
                }
            ]
        },
        {
            name: 'Prod',
            actions: [
                {
                    type: 'BUILD',
                    name: 'Deploy',
                    script: '/deploy.yml',
                    env: {
                        STAGE: 'prod',
                        CANARY: 'off'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'prodZip'
                }
            ]
        }
    ]
}
