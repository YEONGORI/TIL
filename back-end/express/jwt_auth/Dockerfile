FROM node:current-alpine3.16
WORKDIR /home/yeongori/workspace/Engineering-data-search-service/api
COPY package*.json ./
RUN npm install --silent
COPY . . 
CMD ["npm", "start"]
EXPOSE 8080