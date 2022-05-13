# ----------------------------------------
#  Development Environment Setup
# ----------------------------------------

FROM node:14 as base

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . ./

ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]

# ----------------------------------------
#  Production Environment Setup
# ----------------------------------------

#FROM base as production

#ENV NODE_PATH=./build

#RUN npm run build