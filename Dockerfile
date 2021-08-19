# syntax=docker/dockerfile:1

FROM node:15.0.1
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

CMD ["node", "./lib/index.js"]
