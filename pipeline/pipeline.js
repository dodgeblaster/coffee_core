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
                    name: 'DeployBaseResources',
                    inputArtifact: 'sourceZip',
                    stackName: 'coffecoreresources-staging',
                    template: 'app/resources_base.yml',
                    parameters: {
                        Stage: 'staging'
                    }
                },
                {
                    type: 'BUILD',
                    name: 'DeployLambdasAndTests',
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
                }
            ]
        },
        {
            name: 'Prod',
            actions: [
                {
                    type: 'DEPLOY',
                    name: 'DeployBaseResources',
                    inputArtifact: 'sourceZip',
                    stackName: 'coffecoreresources-prod',
                    template: 'app/resources_base.yml',
                    parameters: {
                        Stage: 'prod'
                    }
                },
                {
                    type: 'BUILD',
                    name: 'DeployLambdasAndTests',
                    script: '/deploy.yml',
                    env: {
                        STAGE: 'prod',
                        CANARY: 'on'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'prodZip'
                }
            ]
        }
    ]
}
