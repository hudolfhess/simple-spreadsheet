FROM node:slim
WORKDIR /app

COPY . .

RUN npm install
RUN npx prisma generate --schema=./prisma/postgresql/schema.prisma

EXPOSE 3000

CMD ["npm", "run", "dev"]
