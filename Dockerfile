FROM node:alpine

WORKDIR /app

COPY ./package*.json .

RUN npm install

COPY . .

RUN npm run build

ENV NUXT_PORT=3001

CMD ["npm", "run", "start"]

EXPOSE 3001