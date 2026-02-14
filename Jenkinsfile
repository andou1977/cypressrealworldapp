pipeline {
    agent any

    options {
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Node & Dependencies') {
            steps {
                sh '''
                    node -v || true
                    npm ci
                '''
            }
        }

        stage('Run Cypress tests') {
            steps {
                sh 'npx cypress run --browser chrome'
            }
        }

        stage('Archive artifacts') {
            steps {
                archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
                junit 'cypress/results/*.xml'
            }
        }
    }

    post {
        always {
            echo "Pipeline terminé."
        }
    }
}