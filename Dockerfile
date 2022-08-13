FROM node:12-alpine

RUN npm i -g nodemon

RUN apk --update add redis

RUN mkdir /oj

WORKDIR /oj

COPY package.json /oj

COPY package-lock.json /oj

RUN npm i

COPY . /oj

EXPOSE 3000

CMD ["sh","-c","redis-server --daemonize yes && npm start"]