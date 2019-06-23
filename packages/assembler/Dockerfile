FROM node:10

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

# Step to install components stock

CMD ["npm", "start"]