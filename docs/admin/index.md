# Perseo Context-Aware CEP Admin Guide

## Deployment of Perseo

Perseo can be built and installed directly from sources, but we strongly recommend deploying it using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

### Dependencies

Perseo CEP is a standard [Node.js](https://nodejs.org/es/) application and does not require more dependencies than the *Node.js interpreter* and the [NPM](https://www.npmjs.com/) package utility.

A [mongoDB 3.2](https://www.mongodb.com/) database should be working and accesible in order for Perseo to be started.

### Using docker-compose

If you want to quickly deploy all the components of a typical scenario at once to start experimenting with Perseo ASAP, do the following:

- If you need to install Docker, refer to [Docker Installation](https://docs.docker.com/install/). Then, see [Docker Compose Installation](https://docs.docker.com/compose/install/) to have it installed.

- Download (or create locally) a copy of [this docker-compose.yml]() file.

```
version: "3"

services:
    mongo:
       image: mongo:3.2
       ports:
           - 27017:27017
       networks:
         - main
       volumes:
            - ./mongodata:/data/db

    orion:
       image: fiware/orion
       depends_on:
         - mongo
       links:
         - mongo
       ports:
         - "1026:1026"
       networks:
            main:
                aliases:
                    - orion.docker
       command: -dbhost mongo

    perseo-core:
        image: telefonicaiot/perseo-core:1.1.0
        ports:
            - 8080:8080
        networks:
            main:
                aliases:
                    - perseo-core
        command: -perseo_fe_url perseo-fe:9090

    perseo-fe:
        image: telefonicaiot/perseo-fe:1.5.0
        ports:
            - 9090:9090
        networks:
            main:
                aliases:
                    - perseo-fe
        depends_on:
            - perseo-core
        environment:
            - PERSEO_MONGO_ENDPOINT=mongo
            - PERSEO_CORE_URL=http://perseo-core:8080
            - PERSEO_LOG_LEVEL=debug
            - PERSEO_ORION_URL=http://orion.docker:1026/v1/updateContext
            - PERSEO_SMTP_HOST=smtp.gmail.com
            - PERSEO_SMTP_PORT=465
            - PERSEO_SMTP_SECURE=true
            - PERSEO_SMTP_AUTH_USER=XXXXX@XXXXX.com
            - PERSEO_SMTP_AUTH_PASS=XXXXX

networks:
    main:
        external: true
```

- Then start it up:

```
# same path were you have placed the docker-compose.yml
$ docker-compose up -d
```

- After a while, check that all containers are running (up):

```
$ docker ps
``` 

- Now you're ready to use Perseo as instructed in the [User Manual](../user/index.md).

- When you are done experimenting, remember to teardown the compose.

```
$ docker-compose down -v
```

### Reuse External Orion Instance

If you have already Orion running somewhere else and you just want to deploy Perseo, you can proceed as explained in the previous sections, but before running ```docker-compose up``` remove from the `docker-compose.yml` file the complete definition of the ```orion:``` and ```mongo:``` services. You will also need to change the references to them in the ```environment:``` section of the ```perseo-fe``` service.