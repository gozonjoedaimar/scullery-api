pipeline {
    agent any
    stages {
        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'touch .build_$(date +%Y%m%d%H%M%S)'
            }
        }
    }
}