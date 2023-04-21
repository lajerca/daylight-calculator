FROM node:18-alpine as base_image
WORKDIR /app

COPY package.json .
RUN npm install

COPY index.ts .
COPY tsconfig.json .

# Make image for development
FROM base_image as development
CMD [ "npm", "run", "dev" ]

# Transpile ts files to js
FROM base_image as compiled
RUN npm i typescript
RUN npx tsc

# Make clean production image with only necessary stuff
FROM node:18-alpine as production
COPY --from=compiled /app /app
RUN rm -rf /app/node_modules/typescript
CMD [ "node", "/app/index.js" ]
