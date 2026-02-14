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

        stage('Install dependencies') {
            steps {
                bat 'npm install --legacy-peer-deps'
            }
        }

        stage('Run Cypress tests') {
            steps {
                bat 'npx cypress run --browser chrome'
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