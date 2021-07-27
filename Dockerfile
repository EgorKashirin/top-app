FROM node:16.4.2-alpine3.14
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npm run build
RUN npm prune --production
CMD ["npm","start"]
EXPOSE 3000