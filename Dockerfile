FROM node:latest

COPY . /home/graphql

WORKDIR /home/graphql

EXPOSE 4000

ENTRYPOINT [ "node", "./dist/server.js" ]