FROM node:20-alpine
RUN apk add --no-cache python3 py3-pip
WORKDIR /app

ARG PORT_BACKEND=3000

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE ${PORT_BACKEND}

CMD ["npm", "run", "start"]