FROM node:boron

EXPOSE 80

COPY public /node/app
WORKDIR /node/app
RUN npm install

ENTRYPOINT [ "npm", "start" ]