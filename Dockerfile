FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ENV NODE_ENV=production
ENV PORT=5000
ENV POSTGRES_HOST=db
ENV POSTGRES_USER=irb1s
ENV POSTGRES_DB=db_iform
ENV POSTGRES_PORT=5432
ENV POSTGRES_PASSWORD=urPas
ENV PRIVATE_KEY=urKey

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
