FROM node:0

COPY . /src

RUN cd /src; npm install

ENV NODE_ENV=production

EXPOSE 8003

CMD ["node", "/src/serve.js"]

