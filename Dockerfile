FROM node:slim
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate --schema=./prisma/postgresql/schema.prisma
RUN npx prisma generate --schema=./prisma/mongodb/schema.prisma

EXPOSE 3000

CMD ["npm", "run", "dev"]
