# ----------------------------------------
#  Development Environment Setup
# ----------------------------------------

FROM node:14 as base

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
#WORKDIR /

COPY package*.json ./

RUN npm install

COPY . ./

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]

# ----------------------------------------
#  Production Environment Setup
# ----------------------------------------

#FROM base as production

#ENV NODE_PATH=./build

#RUN npm run build