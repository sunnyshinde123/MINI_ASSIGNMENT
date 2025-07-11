pipeline{
    agent {label 'Dev'}
    stages{
        stage("code"){
            steps{
                git url:"https://github.com/sunnyshinde123/MINI_ASSIGNMENT.git", branch: "main"
            }
        }
        stage("build"){
            steps{
                sh "docker build -t nodeapp ."
            }
        }
        stage("test"){
            steps{
                echo "This is test waali phase"
            }
        }
        stage("push to dockerhub"){
            steps{
                withCredentials([usernamePassword(credentialsId:"dockerHubCred", 
                usernameVariable:"dockerHubUser", 
                passwordVariable:"dockerHubPass")]){
                    sh "echo $dockerHubPass | docker login -u ${env.dockerHubUser} --password-stdin"
                    sh "docker image tag nodeapp ${env.dockerHubUser}/nodeapp:latest"
                    sh "docker push ${env.dockerHubUser}/nodeapp:latest"
                    echo "Image Successfully pushed"
                }
            }
        }
        stage("deploy"){
            steps{
                sh "docker compose down && docker compose up -d --build"
            }
        }
    }
}
