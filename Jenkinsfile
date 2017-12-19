#!/usr/bin/env groovy

node {
  stage('Initialize') {
    sh '''
      env
      pwd
      ls -la
    '''

    def scmVars = checkout scm;
    scmVars.each { key, value ->
      echo "SCMVars[${key}] = ${value}"
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
