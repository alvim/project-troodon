FROM node:10

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "start"]