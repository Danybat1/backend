# Stage 1
FROM node:19.5.0-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npm install
COPY . .
RUN npm run build
EXPOSE 7001
CMD [ "npm", "start"]