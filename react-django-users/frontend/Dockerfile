# Install stage
FROM node:20-alpine3.17 as install

WORKDIR /app

COPY package.json .
COPY tsconfig.json .

RUN npm install

COPY src/ src/
COPY public/ public/

# Development image
FROM install as dev

WORKDIR /app

EXPOSE 3000

CMD ["npm", "start"]

# Build stage
FROM install as build

WORKDIR /app

ARG API_URL
ENV REACT_APP_API_URL=$API_URL

ARG API_PREFIX
ENV REACT_APP_API_PREFIX=$API_PREFIX

ARG API_VERSION
ENV REACT_APP_API_VERSION=$API_VERSION

RUN npm run build

# Production image
FROM nginx:1.25.2 as prod
COPY --from=build /app/build /usr/share/nginx/html