FROM node:14.17.3-alpine AS react-build

WORKDIR /usr/src/app

COPY package\*.json ./

RUN npm install

COPY . .

RUN npm run build

#stage 2 - production environment
FROM nginx:stable-alpine

COPY nginx.conf /etc/ngix/conf.d/default.conf

COPY --from=react-build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]