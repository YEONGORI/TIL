FROM node:current-alpine3.16
WORKDIR /home/yeongori/workspace/TIL/back-end/express/jwt_auth
COPY package*.json ./
RUN npm install --silent
COPY . . 
CMD ["npm", "start"]
EXPOSE 8080