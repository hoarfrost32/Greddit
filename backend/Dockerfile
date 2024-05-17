FROM node:19

COPY package*.json ./

RUN npm install -f

COPY . .

EXPOSE 5000

CMD ["npm","run", "dev"]