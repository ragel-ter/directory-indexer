FROM node:18

ENV APP_LISTENER_PORT=8000

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE $APP_LISTENER_PORT

CMD ["node", "app.js"]