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

    SCM_VARS.each { key, value ->
      echo "SCM_VARS[${key}] = ${value}"
    }

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
