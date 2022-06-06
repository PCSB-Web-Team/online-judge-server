#!/usr/bin/bash

# Start Judge0
cd ../judge0-v1.13.0/
sudo docker-compose up -d db redis
echo 'Waiting for 10 Seconds'
sleep 10s
sudo docker-compose up -d
echo 'Waiting for 5 Seconds'
sleep 5s

#Start Node Server
cd ../online-judge-server/
echo 'Starting Node Server'
sudo docker-compose up -d
echo 'Judge0 & Server up!!'