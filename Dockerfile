FROM node:16
WORKDIR /home/node/app
COPY package.json .
RUN npm install
COPY . .
# COPY migration.sql /docker-entrypoint-initdb.d/
# COPY seed.sql /docker-entrypoint-initdb.d/
CMD ["npm", "start"]