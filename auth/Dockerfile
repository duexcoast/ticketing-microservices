FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install --quiet --production
COPY . . 

CMD ["npm", "start"]