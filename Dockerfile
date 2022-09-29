
FROM node:16.13-alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache bash
RUN apk add --no-cache procps
RUN npm install --global pm2

WORKDIR /app
COPY ./package*.json ./
COPY ./package-lock.json ./
COPY ./server.js ./

RUN npm i --production
ENV NODE_ENV production

RUN mkdir frontend

RUN addgroup -g 1004 -S nodejs
RUN adduser -S expressjs -u 1004

USER expressjs

EXPOSE 3001

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--", "start" ]
