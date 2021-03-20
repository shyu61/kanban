FROM node:14-alpine

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /app
COPY . /app
