FROM node:10

COPY package.json package-lock.json ./

RUN npm install

ARG COMPONENTS_LIBRARY

RUN npm i -S core-components@$COMPONENTS_LIBRARY

COPY . ./

# Step to install components stock

CMD ["npm", "start"]