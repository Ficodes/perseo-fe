
FROM node:alpine

COPY . /opt/perseo-fe/
WORKDIR /opt/perseo-fe

#RUN cd /opt/perseo-fe && npm install --production
RUN cd /opt/perseo-fe && npm install

EXPOSE 9090



CMD bin/perseo

