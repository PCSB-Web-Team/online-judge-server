#!/usr/bin/bash

# Stop Judge0
cd ../judge0-v1.13.0/
sudo docker-compose down

#Stop Node
cd ../online-judge-server/
sudo docker-compose down
echo 'Judge0 & Server Down'

#Execution Command - sudo bash stop.sh