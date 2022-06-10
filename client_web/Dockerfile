FROM node:latest

# RUN curl -L https://www.npmjs.com/install.sh | sh
RUN npm config set unsafe-perm true
WORKDIR /var/www/html/

COPY . .

EXPOSE 3000

RUN npm install

CMD [ "npm", "start" ]


