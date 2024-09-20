FROM node:18-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install --production

COPY src .

EXPOSE 3001

CMD ["node", "app.js"]