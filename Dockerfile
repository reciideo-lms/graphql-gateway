FROM node:latest AS build

WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/
RUN yarn install
COPY . /usr/src/app/
RUN ["yarn", "build"]
RUN rm -rf /usr/src/app/node_modules
RUN yarn install --prod



FROM node:14.5.0-alpine3.12

ENV NODE_ENV=production

WORKDIR /usr/src/app/
#TODO Generate schema in build process
#RUN addgroup -S gateway && adduser -S gateway -G gateway
COPY --from=build /usr/src/app /usr/src/app

#USER gateway
EXPOSE 4000

ENTRYPOINT ["node", "dist/index"]
