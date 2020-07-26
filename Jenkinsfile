pipeline {
    agent any
    tools {
        maven 'maven'
        jdk 'jdk11'
    }
    stages {

        stage ('Build') {
            steps {
                sh 'mvn -Dmaven.test.failure.ignore=true install'
            }
            post {
                success {
                    junit 'target/surefire-reports/**/*.xml'
                }
            }
        }
    }
}