FROM node:20-alpine
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]