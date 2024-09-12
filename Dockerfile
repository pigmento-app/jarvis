# Environnement
FROM node:alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY pigmento-d89f9-firebase-adminsdk-4c7o5-3f1c994b8c.json pigmento-d89f9-firebase-adminsdk-4c7o5-3f1c994b8c.json
RUN npm i

COPY src src
COPY tsconfig.json tsconfig.json

CMD npm start