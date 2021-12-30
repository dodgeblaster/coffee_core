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
                    type: 'DEPLOY',
                    name: 'BaseResources',
                    inputArtifact: 'sourceZip',
                    stackName: 'coffecoreresources-staging',
                    template: 'app/resources_base.yml',
                    parameters: {
                        Stage: 'staging'
                    }
                },
                {
                    type: 'BUILD',
                    name: 'Deploy',
                    script: '/deploy.yml',
                    env: {
                        STAGE: 'staging',
                        CANARY: 'off'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'buildZip'
                },
                {
                    type: 'INVOKE',
                    name: 'Test',
                    functionName:
                        'coffeecoretestsstaging-makePaymentTest-staging',
                    region: 'us-east-1'
                },
                {
                    type: 'APPROVAL',
                    name: 'ReadyToRelease'
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
