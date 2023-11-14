FROM node:18.16.0-alpine3.17

ENV NODE_ENV development
ENV PORT 8080
ENV PG_HOST localhost
ENV PG_PORT 5432
ENV PG_USER postgres
ENV PG_PASSWORD mojalozinka
ENV PG_DATABASE ORbaza

RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/tmp
WORKDIR /opt/app
COPY /package.json /package-lock.json /tsconfig.json ./
RUN npm install
COPY src/ ./src/
RUN npm run build
EXPOSE 8080
CMD [ "npm", "start"]