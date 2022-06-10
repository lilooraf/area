FROM node:latest

WORKDIR /opt/area/server

COPY . .

RUN npm config set unsafe-perm true
RUN npm install

EXPOSE 3030

CMD [ "npm", "start" ]
