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

    // docker
    //   .image('usgs/hazdev-base-images:8-node')
    //   .withRun("-v .:/hazdev-build")
    //   .inside() {
    //     sh '''
    //       cd /hazdev-build
    //       npm install
    //     '''
    //   }

    sh """
      docker run --name npm-installer --rm -v ${WORKSPACE}:/hazdev-build ${DOCKER_NODE_IMAGE} /bin/bash --login -c "cd /hazdev-build && npm install"
    """

    sh '''
      ls -la
    '''
  }

  stage('Unit Test') {

  }

  stage('End to End Tests') {

  }

  stage('Coverage') {

  }

  stage('Build') {

  }

  stage('Create Image') {

  }


  stage('Image Vulnerabilities') {

  }

  stage('Publish Image') {

  }
}
