#!/usr/bin/bash

# Start Judge0
sudo docker-compose -f docker-compose.judge0.yml up -d db redis
echo 'Waiting for 10 Seconds'
sleep 10s
sudo docker-compose -f docker-compose.judge0.yml up -d
echo 'Waiting for 5 Seconds'
sleep 5s

#Start Node Server
echo 'Starting Node Server'
sudo docker-compose up
echo 'Container is Up!!'