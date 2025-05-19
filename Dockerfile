# start from Node 18
FROM node:18-slim

# install Chrome dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates fonts-liberation libatk1.0-0 libatk-bridge2.0-0 libgtk-3-0 \
    libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libxshmfence1 libgbm1 \
    libnss3 libasound2 libxss1 libpango-1.0-0 libxcursor1 wget --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY . .
ENV PORT=8080
EXPOSE 8080

CMD ["node", "index.js"]
