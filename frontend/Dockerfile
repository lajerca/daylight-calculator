FROM node:18-alpine AS builder
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
WORKDIR /app

COPY package.json .
RUN npm install

COPY public ./public
COPY src ./src
COPY index.html .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY .eslintrc.cjs .
COPY vite.config.ts .
COPY env.d.ts .

RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]
