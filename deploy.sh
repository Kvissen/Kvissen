#!/usr/bin/env sh

# Deploy script to server using ssh, scp and docker

HOST="130.225.170.170"
PORT="22022"
USER="s160107"
DIRECTORY="~/temp"

# Mark file as readable
chmod 400 id_rsa

# ssh to VM
#ssh -p $PORT -i id_rsa -o "StrictHostKeyChecking=no" $USER@$HOST

# Transfer webapp project
scp -v -r -P $PORT -i id_rsa src/main/webapp/* $USER@$HOST:$DIRECTORY

# Transfer Jar file
scp -v -r -P $PORT -i id_rsa target/Kvissen.jar $USER@$HOST:$DIRECTORY