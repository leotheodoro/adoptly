FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm ci

FROM node:20.12.2-alpine3.19 AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/build ./build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/prisma ./prisma

ENV NODE_ENV=prod
ENV PORT=3333
ENV JWT_SECRET="77732cde17f486d5fa557d77ae623716"
ENV DATABASE_URL="file:./db.sqlite"
ENV POSTGRESQL_USERNAME="docker"
ENV POSTGRESQL_PASSWORD="docker"
ENV POSTGRESQL_DATABASE="adoptly"

RUN npx prisma generate

EXPOSE 3333

CMD ["npm", "run", "start"]

