#!/bin/bash
cd $(dirname $0)

tmp="/tmp/deploy-docker/"
sudo rm -rf $tmp
mkdir $tmp

cp $1 "$tmp/app.jar"
cp $2 "$tmp/application-online.yml"
cp dockerfile "$tmp/dockerfile"
dockername=$3

cd $tmp
timestamp=`date +%s`
sudo /usr/bin/docker build -t $dockername:$timestamp .
sudo /usr/bin/docker build -t $dockername:latest .

sudo /usr/bin/docker ps|grep $dockername && sudo /usr/bin/docker stop $dockername
sudo /usr/bin/docker ps -a|grep $dockername && sudo /usr/bin/docker rm $dockername
sudo /usr/bin/docker run -d --net host --name $dockername -v /var/log/:/var/log/ $dockername:$timestamp

sudo rm -rf $tmp
