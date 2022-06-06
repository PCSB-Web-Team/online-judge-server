#!/usr/bin/bash

# Stop Judge0
sudo docker-compose -f docker-compose.judge0.yml down

#Stop Django
sudo docker-compose down