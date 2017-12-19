#!/usr/bin/env groovy

node {
  // Set by "checkout" step below
  def SCM_VARS = [:];
  def FAILURE = null;

  // Used for consistency between other variables
  def APP_NAME = 'earthuake-geoserve-ui'
  // Used to install dependencies and build distributables
  def DOCKER_BUILD_CONTAINER = "${APP_NAME}-${BUILD_ID}-BUILD"
  // Used to run linting, tests, coverage, e2e within this container
  def DOCKER_TEST_CONTAINER = "${APP_NAME}-${BUILD_ID}-TEST"
  // Used to run penetration tests against
  def DOCKER_PENTSET_CONTAINER = "${APP_NAME}-${BUILD_ID}-PENTEST"
  // Used to run penetration tests against before tagging for release
  def DOCKER_CANDIDATE_IMAGE = "local/${APP_NAME}:${BUILD_ID}"

  try {
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
        docker run --rm --name ${DOCKER_BUILD_CONTAINER} \
          -v ${WORKSPACE}:/app \
          ${DOCKER_NODE_IMAGE} \
          /bin/bash --login -c \
          "cd /app && npm update"

        ls -al
      """

      // Leaves behind ...
      //   ${WORKSPACE}/node_modules <-- Used by later stages
      //   ${WORKSPACE}/dist         <-- Contains distributable artifacts
    }

    stage('Tests') {
      sh """
        docker run --rm --name ${DOCKER_TEST_CONTAINER} \
        -v ${WORKSPACE}:/app \
        ${DOCKER_TEST_IMAGE} \
        /bin/bash --login -c \
        "ng lint && ng test --single-run --code-coverage --progress false && ng e2e --progress false"
      """

      publishHTML(target: [
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
      // TODO :: Use ng base-url switch during build process
      sh """
        docker run --rm --name ${DOCKER_BUILD_CONTAINER} \
          -v ${WORKSPACE}:/app \
          ${DOCKER_NODE_IMAGE} \
          /bin/bash --login -c \
          "cd /app && npm run build -- --prod --progress false"

        docker build \
          --build-arg BASE_IMAGE=${DOCKER_DEPLOY_BASE_IMAGE} \
          -t ${DOCKER_CANDIDATE_IMAGE} \
          .
      """

      // TODO :: Run pen tests
      sh """
        docker login ${REGISTRY_HOST} -u ${REGISTRY_USER} -p ${REGISTRY_PASS}

        docker run --name ${DOCKER_PENTSET_CONTAINER} \
          -d ${DOCKER_CANDIDATE_IMAGE}

        OWASP_CONTAINER_ID=`docker run -d -u zap \
          --name=${DOCKER_OWASP_CONTAINER} \
          --link=${DOCKER_PENTEST_CONTAINER} \
          -v ${OWASP_REPORT_DIR}:/zap/reports:rw \
          -i ${OWASP_IMAGE} \
          zap.sh \
          -daemon \
          -port 8090 \
          -config api.disablekey=true \
        `

        sleep 20;

        PENTEST_IP=`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${DOCKER_PENTEST_CONTAINER}`

        docker exec $OWASP_CONTAINER_ID \
          zap-cli -v -p 8090 spider \
          http://$PENTEST_IP/

        docker exec $OWASP_CONTAINER_ID \
          zap-cli -v $ZAP_API_PORT active-scan \
          http://$PENTEST_IP/

        docker exec $OWASP_CONTAINER_ID \
          zap-cli -v -p 8090 report \
          -o /zap/reports/wasp-zap-report.html -f html
      """

      // TODO :: retag as DOCKER_DEPLOY_IMAGE:DOCKRE_DEPLOY_IMAGE_VERSION
      // TODO :: push to registry
    }
  } catch (e) {
    mail to: 'emartinez@usgs.gov',
      from: 'noreply@jenkins',
      subject: 'Jenkins: earthquake-design-ui',
      body: "Project build (${BUILD_TAG}) failed with '${e.message}'"

    FAILURE = e;
  } finally {
    stage('Cleanup') {
      sh """
        docker container rm --force ${DOCKER_BUILD_CONTAINER} || echo 'No spurious build container'
        docker container rm --force ${DOCKER_TEST_CONTAINER} || echo 'No spurious test container'
        docker image rm --force ${DOCKER_CANDIDATE_IMAGE} || echo 'No spuious test image'
      """

      if (FAILURE) {
        currentBuild.result = 'FAILURE';
      }
    }

  }

}
