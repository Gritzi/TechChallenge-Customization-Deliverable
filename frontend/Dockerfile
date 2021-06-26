# pull official base image
# BUILD Step
FROM node:16 as builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

RUN npm run build


# pull official base image
# Prod step
FROM node:16 as runner

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN npm install --global http-server

EXPOSE 80

COPY --from=builder /app/dist .

COPY --from=builder /app/debug.sh .

RUN ./debug.sh

CMD [ "http-server", ".", "-p 80"]