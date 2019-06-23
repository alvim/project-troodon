FROM node:10

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

# Step to install components stock
COPY ../stock/dist ./src/Stock

CMD ["npm", "start"]