FROM node:19 as build-stage

COPY package*.json ./

RUN npm install -f

COPY . .

EXPOSE 3000

CMD ["npm","start"]