FROM node:8.11.1

EXPOSE 80

COPY public /node/app
WORKDIR /node/app
RUN npm install

ENTRYPOINT [ "npm", "start" ]