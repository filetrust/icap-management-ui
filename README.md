# icap-management-ui
![CI](https://github.com/filetrust/icap-management-ui/workflows/CI/badge.svg)
![CD Dev](https://github.com/filetrust/icap-management-ui/workflows/CD%20Dev/badge.svg)
![CD QA](https://github.com/filetrust/icap-management-ui/workflows/CD%20QA/badge.svg)
![CD Prod](https://github.com/filetrust/icap-management-ui/workflows/CD%20Prod/badge.svg)
  
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=filetrust_icap-management-ui&metric=bugs)](https://sonarcloud.io/dashboard?id=filetrust_icap-management-ui)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=filetrust_icap-management-ui&metric=code_smells)](https://sonarcloud.io/dashboard?id=filetrust_icap-management-ui)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=filetrust_icap-management-ui&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=filetrust_icap-management-ui)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=filetrust_icap-management-ui&metric=ncloc)](https://sonarcloud.io/dashboard?id=filetrust_icap-management-ui)
  
Repository for the Management UI in the Glasswall ICAP Program

## Setup

### Prerequisites
- [Docker desktop](https://www.docker.com/)
- [Node.js](https://nodejs.org/en/) version 12 or later
- [Minikube](https://minikube.sigs.k8s.io/docs/start/)

### Running the Server Locally (Node.js)
#### Make sure you're in the ./server directory of the project.
#### Yarn
```
npm install -g yarn
```
  
This command will install the Yarn package manager. Yarn is used to build the project.
  
#### Installation
```
yarn install
```
  
Installs all NPM packages and dependencies specified in the package.json file.
  
#### Debugging the Server in vscode
```
yarn dev
```
  
This command runs the 'dev' script in the package.json file, which starts a local development server, the server is exposed on port 8080. Navigating to http://localhost:8080 should show the homepage.

To break on server code, the nodemon debugger needs to be attached. We have a launch.json file defined in the project, so head to the "debug" tab on the sidebar and click the "play" button. This should attach the debugger and allow you to hit breakpoints in the ./server code.
  
<hr/>    
  
### Running the Server Locally (Docker)
#### Make sure you're in the root directory of the project and Docker is running.
  
#### Build the Docker Image
```
docker build --tag glasswallsolutions/icap-management-ui:version -f server/Dockerfile .
```
  
This command builds the Docker image from the Dockerfile, [docker build](https://docs.docker.com/engine/reference/commandline/build/).
  
#### Run the Docker Container
```
docker run -p 4000:8080 -d glasswallsolutions/icap-management-ui:version -e TRANSACTION_EVENT_API_URL="<url>" POLICY_MANAGEMENT_API_URL="<url>"
```
  
<b>Note:</b> This will run the server in production-mode.  
This command runs the Docker container using the Docker image that was just built, [docker run](https://docs.docker.com/engine/reference/run/).  
The <b>-p</b> flag maps the exposed port 8080 to port 4000.  
The <b>-d</b> flag runs the container in detached mode, which runs in the background.  
The <b>-e</b> flag will pass any string values as environment variables to the image.

<hr/>

### Running the Server in Minikube
#### Make sure you're in the root directory of the project and Docker is running.

#### Prerequisites
- kubectl + Minikube

#### Start a Minikube cluster
```
minikube start
```

If Minikube installed correctly, you should see a cluster spin up in the Docker Desktop dashboard.

#### Add the Helm Chart to the Cluster
```
helm install icap-management-ui ./kube
```
Deploys a helm chart to the default namespace using the chart in ./kube.Chart.yaml and the values in ./kube/values.yaml. The deployment and service yaml files from /kube/template will be applied to the cluster automatically.

#### Verify the Pod(s) are Spinning Up
```
kubectl get pods --watch
```
The pod icap-management-portal should be spinning up after the helm install, the --watch flag will show any changes in the status. The status should change from ContainerCreating to Running.

#### Start the Service and Tunnel in to the Minikube Cluster (Windows)
```
minikube service icap-management-ui-service
```
Runs the service, exposing the icap-management-portal container. Minikube should automatically tunnel into the service, and a browser window should pop up with the app running on a random port. If the browser window doesn't open, the IP and port of the running service should be displayed on the command output.

## Versioning
The version number displayed on the Navbar of the UI is pulled from the NPM package version specified in ./server/package.json. This should match the latest release number on GitHub.
