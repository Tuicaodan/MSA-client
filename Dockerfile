FROM node:slim

RUN mkdir -p /app/client
WORKDIR /app/server

COPY package*.json ./
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]