#!/usr/bin/env sh

# Deploy script to server using ssh, scp and docker

HOST="kvissen.devops.diplomportal.dk"
PORT="22022"
USER="s160107"
WEBAPPDIRECTORY="~/devops/src/main/webapp"
BASEDIRECTORY="~/devops"
DOCKERIMAGE="kvissen"
DOCKERPORT="8080"

# Mark file as readable
chmod 400 id_rsa

ssh -t -p $PORT -i id_rsa -o "StrictHostKeyChecking=no" $USER@$HOST "rm -rf $BASEDIRECTORY ; mkdir -p $WEBAPPDIRECTORY"

# Transfer webapp project
scp -v -r -P $PORT -i id_rsa src/main/webapp/* $USER@$HOST:$WEBAPPDIRECTORY

# Transfer Jar file
scp -v -r -P $PORT -i id_rsa target/Kvissen.jar $USER@$HOST:$BASEDIRECTORY

# Transfer Dockerfile
scp -v -r -P $PORT -i id_rsa Dockerfile $USER@$HOST:$BASEDIRECTORY


# SSH to VM, Docker build and run
ssh -t -p $PORT -i id_rsa -o "StrictHostKeyChecking=no" $USER@$HOST "cd $BASEDIRECTORY; sudo docker build -t $DOCKERIMAGE .; sudo docker container stop $DOCKERIMAGE; sudo docker container rm $DOCKERIMAGE; sudo docker run --name $DOCKERIMAGE -p $DOCKERPORT:$DOCKERPORT -d $DOCKERIMAGE"
