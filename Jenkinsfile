#!/usr/bin/env groovy

node {
  def SCM_VARS = [:];
  stage('Initialize') {
    sh '''
      env
      pwd
      ls -la
    '''

    // Sets ...
    //   SCM_VARS.GIT_BRANCH (e.g. origin/master)
    //   SCM_VARS.GIT_COMMIT
    //   SCM_VARS.GIT_PREVIOUS_COMMIT
    //   SCM_VARS.GIT_PREVIOUS_SUCCESSFUL_COMMIT
    //   SCM_VARS.GIT_URL
    SCM_VARS = checkout([
      $class: 'GitSCM',
      branches: [
        [name: GIT_BRANCH]
      ],
      doGenerateSubmoduleConfigurations: false,
      extensions: [],
      submoduleCfg: [],
      userRemoteConfigs: [
        [url: GIT_URL]
      ]
    ])


    sh """
      docker run --rm --name npm-installer \
        -v ${WORKSPACE}:/hazdev-build \
        ${DOCKER_NODE_IMAGE} \
        /bin/bash --login -c \
        "cd /hazdev-build && npm install && npm run build --prod"
    """

    // Leaves behind ...
    //   ${WORKSPACE}/node_modules <-- Used by later stages
    //   ${WORKSPACE}/dist         <-- Contains distributable artifacts
  }

  stage('Tests') {
    sh """
      docker run --rm --name ${BUILD_TAG}-Tests \
      -v ${WORKSPACE}:/app \
      ${DOCKER_TEST_IMAGE} \
      /bin/bash --login -c \
      "ng lint && ng test --single-run --code-coverage && ng e2e"
    """

    publicHTML(target: [
      allowMissing: true,
      alwaysLinkToLastBuild: false,
      keepAll: true,
      reportDir: 'coverage',
      reportFiles: 'index.html',
      reportName: 'Code Coverage',
      reportTitles: 'Code Coverage Report'
    ])
  }

  stage('Publish') {
    sh """
      docker build \
        --build-arg BASE_IMAGE=${DOCKER_DEPLOY_BASE_IMAGE} \
        -t local/earthquake-geoserve-ui:build-${BUILD_ID} \
        .
    """
  }

}
