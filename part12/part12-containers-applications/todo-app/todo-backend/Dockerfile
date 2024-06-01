FROM node:16 AS base
WORKDIR /usr/src/app
COPY --chown=node:node . .

FROM base AS test
RUN npm ci --include=dev
ENV MONGO_URL=mongodb://the_username:the_password@127.0.1.1:3456/the_database?directConnection=true&authSource=the_database
ENV REDIS_URL=redis://redis:6379
CMD npm test

FROM base AS prod
RUN npm ci --production
ENV MONGO_URL=mongodb://the_username:the_password@127.0.1.1:3456/the_database?directConnection=true&authSource=the_database
ENV REDIS_URL=redis://redis:6379
CMD npm start