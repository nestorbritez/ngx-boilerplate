### STAGE 1: Build ###
FROM mhart/alpine-node:8.5 as builder
WORKDIR /ng-app
COPY package.json yarn.lock ./
RUN yarn install
RUN npm install -g gulp-cli
COPY . .
RUN gulp build

### STAGE 2: Setup ###
FROM nginx:1.13.5-alpine
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
