FROM node:12-alpine

RUN mkdir /oj

WORKDIR /oj

COPY package.json /oj

COPY package-lock.json /oj

RUN npm ci

COPY . /oj

EXPOSE 4000

CMD [ "npm", "start" ]