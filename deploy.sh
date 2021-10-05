#!/usr/bin/env sh

# Deploy script to server using ssh, scp and docker

HOST="130.225.170.170"
PORT="22022"
USER="s160107"
DIRECTORY="~/temp"
DOCKERIMAGE="kvissen"
DOCKERPORT="8080"


# Mark file as readable
chmod 400 id_rsa

# Transfer webapp project
scp -v -r -P $PORT -i id_rsa src/main/webapp/* $USER@$HOST:$DIRECTORY

# Transfer Jar file
scp -v -r -P $PORT -i id_rsa target/Kvissen.jar $USER@$HOST:$DIRECTORY

# SSH to VM, Docker build and run
ssh -t -p $PORT -i id_rsa -o "StrictHostKeyChecking=no" $USER@$HOST "cd $DIRECTORY; sudo docker build -t $DOCKERIMAGE .; sudo docker run -p $DOCKERPORT:$DOCKERPORT -d $DOCKERIMAGE"
