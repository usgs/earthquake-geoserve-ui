#!/usr/bin/env groovy

node {
  // Set by "checkout" step below
  def SCM_VARS = [:]
  def FAILURE = null

  // Used for consistency between other variables
  def APP_NAME = 'earthquake-geoserve-ui'
  // Used to install dependencies and build distributables
  def DOCKER_BUILD_CONTAINER = "${APP_NAME}-${BUILD_ID}-BUILD"
  // Used to run linting, tests, coverage, e2e within this container
  def DOCKER_TEST_CONTAINER = "${APP_NAME}-${BUILD_ID}-TEST"
  // Container to run application for testing penetration
  def DOCKER_PENTEST_CONTAINER = "${APP_NAME}-${BUILD_ID}-PENTEST"
  // Container to run OWASP testing
  def DOCKER_OWASP_CONTAINER = "${APP_NAME}-${BUILD_ID}-OWASP"

  // Image of application created locally prior to tagging for publication.
  // Used to start DOCKER_PENTEST_IMAGE for security testing
  def DOCKER_CANDIDATE_IMAGE = "local/${APP_NAME}:${BUILD_ID}"
  // Image to use when starting DOCKER_OWASP_CONTAINER
  def DOCKER_OWASP_IMAGE = "${REGISTRY_HOST}/devops/containers/library/owasp/zap2docker-stable"

  def OWASP_REPORT_DIR = "${WORKSPACE}/owasp-data"

  try {
    stage('Initialize') {
      // Sets ...
      //   SCM_VARS.GIT_BRANCH (e.g. origin/master)
      //   SCM_VARS.GIT_COMMIT
      //   SCM_VARS.GIT_PREVIOUS_COMMIT
      //   SCM_VARS.GIT_PREVIOUS_SUCCESSFUL_COMMIT
      //   SCM_VARS.GIT_URL
      SCM_VARS = checkout scm


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
        alwaysLinkToLastBuild: true,
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

        docker pull ${DOCKER_DEPLOY_BASE_IMAGE}

        docker build \
          --build-arg BASE_IMAGE=${DOCKER_DEPLOY_BASE_IMAGE} \
          -t ${DOCKER_CANDIDATE_IMAGE} \
          .
      """

      timeout(
        time: 60,
        unit: 'SECONDS'
      ) {
        sh """
          if [ ! -d "${OWASP_REPORT_DIR}" ]; then
            mkdir -p ${OWASP_REPORT_DIR}
            chmod 777 ${OWASP_REPORT_DIR}
          fi

          ZAP_API_PORT=8090
          docker run --rm --name ${DOCKER_PENTEST_CONTAINER} \
            -d ${DOCKER_CANDIDATE_IMAGE}

          docker run --rm -d -u zap \
            --name=${DOCKER_OWASP_CONTAINER} \
            --link=${DOCKER_PENTEST_CONTAINER} \
            -v ${OWASP_REPORT_DIR}:/zap/reports:rw \
            -i ${DOCKER_OWASP_IMAGE} \
            zap.sh \
            -daemon \
            -port 8090 \
            -config api.disablekey=true

          status='FAILED'
          while [ \$status != 'SUCCESS' ]; do
            sleep 1;
            status=`(docker exec -i ${DOCKER_OWASP_CONTAINER} curl -I localhost:\${ZAP_API_PORT} > /dev/null 2>&1 && echo 'SUCCESS') || echo 'FAILED'`
          done

          PENTEST_IP=`docker inspect \
            -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' \
            ${DOCKER_PENTEST_CONTAINER} \
          `

          docker exec ${DOCKER_OWASP_CONTAINER} \
            zap-cli -v -p \$ZAP_API_PORT spider \
            http://\$PENTEST_IP/

          docker exec ${DOCKER_OWASP_CONTAINER} \
            zap-cli -v -p \$ZAP_API_PORT active-scan \
            http://\$PENTEST_IP/

          docker exec ${DOCKER_OWASP_CONTAINER} \
            zap-cli -v -p \$ZAP_API_PORT report \
            -o /zap/reports/owasp-zap-report.html -f html

          docker stop ${DOCKER_OWASP_CONTAINER} ${DOCKER_PENTEST_CONTAINER}
        """
      }

      publishHTML (target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: OWASP_REPORT_DIR,
        reportFiles: 'owasp-zap-report.html',
        reportName: 'OWASP ZAP Report'
      ])

      if (SCM_VARS.GIT_BRANCH == 'origin/master') {
        IMAGE_VERSION = ${DOCKKER_DEPLOY_IMAGE_VERSION}
      } else {
        IMAGE_VERSION = SCM_VARS.GIT_BRANCH.replace('origin/', '').replace(' ', '_')\
      }

      echo IMAGE_VERSION
      withCredentials([usernamePassword(
        credentialsId: 'gitlab-innersource-admin',
        passwordVariable: 'REGISTRY_PASS',
        usernameVariable: 'REGISTRY_USER'
      )]) {
        sh """
          docker login ${REGISTRY_HOST} -u ${REGISTRY_USER} -p ${REGISTRY_PASS}

          docker tag \
            ${DOCKER_CANDIDATE_IMAGE} \
            ${DOCKER_DEPLOY_IMAGE}:${IMAGE_VERSION}

          docker push ${DOCKER_DEPLOY_IMAGE}:${IMAGE_VERSION}
        """
      }
    }
  } catch (e) {
    mail to: 'emartinez@usgs.gov',
      from: 'noreply@jenkins',
      subject: 'Jenkins: earthquake-design-ui',
      body: "Project build (${BUILD_TAG}) failed with '${e.message}'"

    FAILURE = e
  } finally {
    stage('Cleanup') {
      sh """
        docker container rm --force ${DOCKER_BUILD_CONTAINER} \
          || echo 'No spurious build container'
        docker container rm --force ${DOCKER_TEST_CONTAINER} \
          || echo 'No spurious test container'
        docker image rm --force ${DOCKER_CANDIDATE_IMAGE} \
          || echo 'No spurious test image'
      """

      if (FAILURE) {
        currentBuild.result = 'FAILURE'
        throw FAILURE
      }
    }

  }

}
