## Project name: Nodeapp Deployment projects

A Dockerised React application build into a container and pushed into Docker Hub, created the index.js file
as landing page an server test page,to check if the server is litening at port:3000 as specified,
### Featured technologies
•	Node.js: An open-source JavaScript run-time environment for executing server-side JavaScript code.
•	Cloud: Accessing computer and information technology resources through the Internet.
•	Container Orchestration: Automating the deployment, scaling and management of containerized applications.

#	Create an environment variable for your docker username

  $ export docker_username="MY_DOCKER_USERNAME"

2. Run the application
1.	Install Node.js
2.	Run the following commands in a terminal:

# Run the application using Docker
 1.	Build the image
2.	Run the image
3.	
 # Prerequisites:

  1.	Create Docker account

3.	Install Docker CLI

5.	Retrieve and save your Docker user id

7. Build the image

# In a terminal, run:

$ docker build -t $docker_username/deploy-react-kubernetes .

# your image should be listed by running:

$ docker images

### Ran the command below

$ node index.js 

# Now inside the dockerfile created

CMD ["node","index.js"]

# Creating the Dockerfile
Created Dockerfile as shown in the repo, this will help in building Docker image for the application .

However using base image node:current-alpine beacuse its very light weight to reduce the size of the final docker

built image and container image, this serve as part of the optimisation process.

Secondly to further optimised my final docker image and container image process also put some of the files

that are not not neccessary to be inside the container image placed such files in 

.Dockerignore file files such as package.json,packge-lockjson.node_modules,

.gitignore,

 ## Dockerfile



# Built the image  and running the neccessary commands

 $ docker build -t ggood777lord/nodeimage .
 

  $ docker images once the docker image was built then run the container exposed at port:3000

   tested'
# run the the container 

 $ docker run -d -p  3000:3000 good777lord/nodeimage:latest

# check for all conatiner both runnin gand not running

 $ docker ps -a
# now login into docker preparatry to pushing the image into Dockerhub
 $ docker login

 # Now push the image into Dockerhub
 $ docker image push good777lord/nodeimage:latest

 # Now stop and remove the container prepratory to deploying the application into kubernetes cluster
  $docker stop <cimageconatinerID>
 $ docker rm <cimageconatinerID>

# Creating the deployment object by creating a kubernetes folder in the root directory
 $ touch mkdir kubernetes

 $ cd kubernetes && touch deployment.yml && service.yml


The deployment.yml file for my deployment object for the kubernetes cluster as shown in the repo added all

the configurations neccessary as shown , after ran the command below to apply the deployment file as shown below

ApiVersion: apps/v1

kind: Deployment

metadata:

  name: nodeapplication-deployment
  
  labels:
  
    app: nodeapplication
    
spec:
  replicas: 1
  
  selector:
  
    matchLabels:
    
      app: nodeapplication
      
  template:
  
    metadata:
    
      labels:
      
        app: nodeapplication
        
    spec:
    
      containers:
      
      - name: nodeappserver'
      
        image: ggood777lord/nodeimage:latest
        
        ports:
        
        - containerPort: 3000
        
        
---

apiVersion: v1

kind: Service

metadata:

  name: nodeapplication-service
spec:

  selector:
  
    app: nodeapplication 
    
  type: LoadBalancer'
  
  ports:
  
  - protocol: TCP
  - 
    port: 5000
    
    targetPort: 3000
    
    nodePort: 31110

# make sure your cluster is running in this case minikube for low production
$ minikube start

$ minikube status

minikube
type: Control Plane
host: Running
kubelet: Running
apiserver: Running
kubeconfig: Configured

# Now check if you have any poas running using the kubectl cli commands
 $kubectl get pods
# delete any pods not usefull but still running
 $ kubectl delete <podname>

 # now check again if all those pods are deleted  and gone
  $ kubectl get po
# Run the following command to remove the container forcefully: 
  $docker rm -f < Container_ID>

# Now create your pods and deployment objects

$ kubectl apply -f deployment.yml

$ kubectl get pods

$ kubectl get nodes 

$ kubectl get deployments

 # Creating the service for the application

I needed to be able to access the application at port:3000 inside the container

so i need to create a service of type:LoadBalancer that will allow the application to

be accessble as the targetport:3000 which is the ame as the host port.For internal

comnuincation between the pods the service type:clusterip .However in the case i had

to create the service.yml file as shown in my repo

$ kubectl apply -f service.yml 

$ kubectl get svc 

$ kubectl describe service good777lord/nodeimage

$ kubectl get svc
# Now to run the application externall using loadbalancer by running e command  below
 $ minikube service <podservicename>

 ╭──────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                          │
│    You are trying to run the amd64 binary on an M1 system.                                               │
│    Please consider running the darwin/arm64 binary instead.                                              │
│    Download at https://github.com/kubernetes/minikube/releases/download/v1.30.1/minikube-darwin-arm64    │
│                                                                                                          │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯
|-----------|----------------------------|-------------|---------------------------|
| NAMESPACE |            NAME            | TARGET PORT |            URL            |
|-----------|----------------------------|-------------|---------------------------|
| default   | nodejsapplication1-service |        5000 | http://192.168.49.2:31111 |
|-----------|----------------------------|-------------|---------------------------|
🏃  Starting tunnel for service nodejsapplication1-service.
|-----------|----------------------------|-------------|------------------------|
| NAMESPACE |            NAME            | TARGET PORT |          URL           |
|-----------|----------------------------|-------------|------------------------|
| default   | nodejsapplication1-service |             | http://127.0.0.1:59596 |
|-----------|----------------------------|-------------|------------------------|


# Now that the application is runing lets now create the helm charts objects to mamange our kubernetes files 
# first make sure your cluster is running and docker
$ minikube status
$minikube start

# check your ckuster information 
 $kubectl cluster-info

# to get more details run the command below
 $kubectl cluster-info dump

 # Now once done please delete all deployment and service objects that exist in the kubernetses directory where you have been working by runni g this command

 $ kubectl delete -f .

 # Now lets create our helm charts templates but make sure helm is installed

 $ helm version
 version.BuildInfo{Version:"v3.12.1", GitCommit:"f32a527a060157990e2aa86bf45010dfb3cc8b8d", GitTreeState:"clean", GoVersion:"go1.20.4"}
 # create the helm template now

 $ helm create nodeapplication

 # This automatically craetes all the helm templates to be used , you can remove the ones not needed

 Now inside the nodeapplication folder there is a chart directory (folder) delete it and inside the template folder there is a test directory(folder) delete it, Also hpa.yml ,ingress.yml and serviceaccount.yml delete them all you dont need for now.

 So you only need for now the deployment.yaml, NOTES.txt, values.yaml,service.yaml,chart.yaml

 # inside the 
./template/values.yaml
# under 
repository: nodeapplication

service:
 tyepe: NodePort

# and
tag: "latest"

# How go to 

 ./template/dployement.yaml 
under spec:
# remove the flowing
{{- if not .Values.autonscalling.enabled }}

{{end}}

 under template:
  metadata:
 # remove the flowing
   {{- with .Values.podAnnotations }}
      annotations:
        {{- toYaml . | nindent 8 }}
      {{- end }}

  under spec:
  # remove the folowing 
      {{- with .Values.imagePullSecrets }}
      imagePullSecrets:
        {{- toYaml . | nindent 8 }}
      {{- end }}

   uder spec:
  # remove also 
      serviceAccountName: {{ include "nodeapplication.serviceAccountName" . }}

      securityContext:
        {{- toYaml .Values.podSecurityContext | nindent 8 }}

  uder spec:
    under containers: 
  # remove also  
   securityContext:
            {{- toYaml .Values.securityContext | nindent 12 }}

  under ports:
  # change the containerPort:
            - name: http
              containerPort: {{ .Values.service.targetport }} 

  # Go to values.yaml file and add another port called target  sand map to port 3000
  service:
  type: nodePort
  port: 80
  targetport: 3000   


  inside the deployment.yml 
 containers:
            ports:
            - name: http
              containerPort: {{ .Values.service.targetport}}

 # Now inside the deployment.yaml file remove all below

 livenessProbe:
            httpGet:
              path: /
              port: http
          readinessProbe:
            httpGet:
              path: /
              port: http
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
      {{- with .Values.nodeSelector }}
      nodeSelector:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.affinity }}
      affinity:
        {{- toYaml . | nindent 8 }}
      {{- end }}
      {{- with .Values.tolerations }}
      tolerations:
        {{- toYaml . | nindent 8 }}
      {{- end }}
             
  # we shall render the helm by running bthe below command  

  $helm template nodeapplication   
# Source: nodeapplication/templates/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: release-name-nodeapplication
  labels:
    helm.sh/chart: nodeapplication-0.1.0
    app.kubernetes.io/name: nodeapplication
    app.kubernetes.io/instance: release-name
    app.kubernetes.io/version: "1.16.0"
    app.kubernetes.io/managed-by: Helm
spec:
  type: nodePort
  ports:
    - port: 80
      targetPort: 3000
      protocol: TCP
      name: http
  selector:
    app.kubernetes.io/name: nodeapplication
    app.kubernetes.io/instance: release-name
---

  # Now release the application

  $helm install nodeapplication    
                       


 

