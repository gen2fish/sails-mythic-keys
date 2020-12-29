FROM node:latest

RUN npm install -g sails grunt npm-check-updates nodemon

RUN mkdir /ltb
WORKDIR /ltb

ENTRYPOINT ["nodemon", "app.js"]

#################
# Build
# docker build -f Dockerfile-local . -t ltb:local
#################
# Run
# docker run -d --rm -v $PWD:/ltb --name ltb_local -p 1337:1337 ltb:local
#################
