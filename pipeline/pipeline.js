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
            name: 'DeployTestStage',
            actions: [
                {
                    type: 'BUILD',
                    name: 'DeployTestStage',
                    script: '/deploy.yml',
                    env: {
                        STAGE: 'test'
                    },
                    inputArtifact: 'sourceZip',
                    outputArtifact: 'buildZip'
                }
            ]
        }
        // {
        //     name: 'DeployTests',
        //     actions: [
        //         {
        //             type: 'BUILD',
        //             name: 'DeployApiTests',
        //             script: '/deployApiTests.yml',
        //             env: {
        //                 STAGE: 'test'
        //             },
        //             inputArtifact: 'sourceZip',
        //             outputArtifact: 'buildZip'
        //         }
        //     ]
        // },
        // {
        //     name: 'RunTests',
        //     actions: [
        //         {
        //             type: 'INVOKE',
        //             name: 'DeployTestInfra',
        //             functionName: 'risefoundationtests-createTestInfra-dev',
        //             region: 'us-east-1'
        //         }
        //     ]
        // }
    ]
}
