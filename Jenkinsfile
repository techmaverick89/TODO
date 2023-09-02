    //   stage('Checkout code') {
    //     steps {
    //         git(url: 'https://github.com/techmaverick89/TODO.git', branch: 'master')
    //     }
    //   }
pipeline {
    agent any
    environment {     
    DOCKERHUB_CREDENTIALS= credentials('dockerhubcredentials')     
    } 
    stages {
      stage('test') {
        steps{
          echo 'test ok'
        }
      }
      stage('Login to Docker Hub') {      	
          steps{                       	
            sh 'echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin'                		
            echo 'Login Completed'      
          }           
      }   
      stage('build') {
        steps {
              sh 'docker build -t maverick0809/demo-ci:backend -f backend/Dockerfile .'
              sh 'docker build -t maverick0809/demo-ci:frontend -f frontend/Dockerfile .'
          }
      }
      stage('deploy_dockerhub') {
        steps{
              sh 'docker push maverick0809/demo-ci:backend '
              sh 'docker push maverick0809/demo-ci:frontend '
          }
      }
  }
      post {
            // Clean after build
            always {
                cleanWs()
            }
        }
}

