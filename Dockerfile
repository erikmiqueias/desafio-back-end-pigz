FROM node:22

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app/

COPY wait-for-it.sh /app/wait-for-it.sh

CMD ["sh", "-c", "./wait-for-it.sh postgres:5432 -- npx prisma migrate deploy && yarn start:dev"]