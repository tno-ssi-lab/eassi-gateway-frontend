FROM node:lts

RUN npm install --global @vue/cli

RUN mkdir -p /app/node_modules && chown -R node:node /app

USER node

# Create Directory for the Container
WORKDIR /app

# Only copy the package.json and yarn.lock to work directory
COPY package.json yarn.lock ./

# Install all Packages
RUN yarn install

# Copy all other source code to work directory
COPY . ./

ENV SSI_SERVER_URL=https://path/to/my/server

EXPOSE 8080

CMD [ "yarn", "run", "serve" ]
