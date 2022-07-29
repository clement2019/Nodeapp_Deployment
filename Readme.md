## Project name: Nodeapp Deployment projects

A Dockerised React application build into a container and pushed into Docker Hub, created the index.js file
as landing page an server test page,to check if the server is litening at port:3000 as specified,
### Featured technologies
•	Node.js: An open-source JavaScript run-time environment for executing server-side JavaScript code.
•	Cloud: Accessing computer and information technology resources through the Internet.
•	Container Orchestration: Automating the deployment, scaling and management of containerized applications.

3.	Create an environment variable for your docker username

$ export docker_username="MY_DOCKER_USERNAME"

2. Run the application
1.	Install Node.js
2.	Run the following commands in a terminal:

Run the application using Docker
1.	Build the image
2.	Run the image
3.	
Prerequisites:

1.	Create Docker account

3.	Install Docker CLI

5.	Retrieve and save your Docker user id

7. Build the image

In a terminal, run:

$ docker build -t $docker_username/deploy-react-kubernetes .

Your image should be listed by running:

$ docker images

### Ran the command below

$ node index.js 

Now inside the dockerfile created

CMD ["node","index.js"]

Creating the Dockerfile
Created Dockerfile as shown in the repo, this will help in building Docker image for the application .

However using base image node:current-alpine beacuse its very light weight to reduce the size of the final docker

built image and container image, this serve as part of the optimisation process.

Secondly to further optimised my final docker image and container image process also put some of the files

that are not not neccessary to be inside the container image placed such files in 

.Dockerignore file files such as package.json,packge-lockjson.node_modules,

.gitignore,

 ## Dockerfile

building the image

Built the image running the neccessary commands

$ docker build -t gold777/nodeapp . 

$ docker images once the docker image was built then run the container exposed at port:3000

tested'

$ docker run -d -p 3000:3000 gold777/nodeapp:latest

$ docker ps

Creating the deployment object

The deployment.yml file for my deployment object for the kubernetes cluster as shown in the repo added all

the configurations neccessary as shown , after ran the command below to apply the deployment file as shown below

ApiVersion: apps/v1

kind: Deployment

metadata:

  name: nodeapp-deployment
  
  labels:
  
    app: nodeapp
    
spec:
  replicas: 1
  
  selector:
  
    matchLabels:
    
      app: nodeapp
      
  template:
  
    metadata:
    
      labels:
      
        app: nodeapp
        
    spec:
    
      containers:
      
      - name: nodeserver'
      
        image: gold777/nodeapp:latest
        
        ports:
        
        - containerPort: 3000
        
        
---

apiVersion: v1

kind: Service

metadata:

  name: nodeapp-service
spec:

  selector:
  
    app: nodeapp 
    
  type: LoadBalancer'
  
  ports:
  
  - protocol: TCP
  - 
    port: 5000
    
    targetPort: 3000
    
    nodePort: 31110




$ kubectl apply -f deployment.yml

$ kubectl get pods

$ kubectl get nodes 

$ kubectl get deployments

Creating the service for the application

I needed to be able to access the application at port:3000 inside the container

so i need to create a service of type:LoadBalancer that will allow the application to

be accessble as the targetport:3000 which is the ame as the host port.For internal

comnuincation between the pods the service type:clusterip .However in the case i had

to create the service.yml file as shown in my repo

$ kubectl apply -f service.yml 

$ kubectl get svc '

$ kubectl describe service gold777/nodeapp

$ kubectl get svc
