FROM node:20-alpine

ARG PORT_TGBOT=3001

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE ${PORT_TGBOT}

CMD ["npm", "run", "start"]