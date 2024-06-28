FROM node:20
WORKDIR /usr/src/app
COPY package* .
RUN yarn install
COPY . .
EXPOSE 3001
CMD ["yarn","dev"]