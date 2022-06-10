FROM node:latest

WORKDIR /opt/area/action-server

COPY . .

RUN curl -L https://www.npmjs.com/install.sh | sh
# RUN npm config set unsafe-perm true
RUN npm i -g typescript
RUN npm install

CMD [ "npm", "start" ]
