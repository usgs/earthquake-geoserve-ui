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

    sh '''
      ls -la
    '''
  }

  stage('Tests') {
    sh """
      docker run --rm --name ${BUILD_TAG}-Tests \
      -v ${WORKSPACE}:/app \
      ${DOCKER_TEST_IMAGE} \
      /bin/bash --login -c \
      "npm run alltests"
    """
  }

  stage('Create Image') {

  }

  stage('Image Vulnerabilities') {

  }

  stage('Publish Image') {

  }
}
