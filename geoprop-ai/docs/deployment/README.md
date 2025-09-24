# Deployment Guide 
 
## Deployment Options 
 
### 1. AWS with Terraform 
 
```bash 
cd infrastructure/terraform 
terraform init 
terraform plan 
terraform apply 
``` 
 
### 2. Docker Compose 
 
```bash 
docker-compose -f infrastructure/docker/docker-compose.yml up -d 
``` 
 
### 3. Kubernetes 
 
```bash 
kubectl apply -f infrastructure/k8s/ 
``` 
