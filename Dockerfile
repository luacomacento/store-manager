FROM node:16-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run migration
RUN npm run seed
CMD ["npm", "start"]