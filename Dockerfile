FROM node:0

COPY ./* /src/

RUN cd /src/ && npm install

EXPOSE 8003

ENTRYPOINT node /src/serve.js

