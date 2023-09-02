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



pipeline {
    agent any

    stages {
        stage('Send email') {
            steps {
              echo 'Send email'
            }
        }
    }
    post{
      failure {
       emailext attachmentsPattern: 'hello', body:"fail", mimeType: 'text/html', replyTo: 'trankimban0809@gmail.com', subject: 'hello', to: '2151050035bang@ou.edu.vn'
      }
      success  {
 emailext attachmentsPattern: 'hello', body: '''<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello guys</h1>
        <p>Have a good day</p>
        <p>Thank you for using our services!</p>
        <a href="[JENKINS_DASHBOARD_URL]" class="btn">Visit</a>
    </div>
</body>
</html>
''', mimeType: 'text/html', replyTo: 'trankimban0809@gmail.com', subject: 'hello', to: '2151050035bang@ou.edu.vn'
      }
    }
}
