pipeline {
    agent {
        docker {
            image 'cypress/included:12.17.3'
            args '-u root'
        }
    }

    options {
        timestamps()
        ansiColor('xterm')
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress tests') {
            steps {
                sh 'npx cypress run --browser chrome'
            }
        }

        stage('Archive test artifacts') {
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
        failure {
            echo "Les tests Cypress ont échoué."
        }
    }
}