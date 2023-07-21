# BE-nodeJS-starter

This is a starter kit for anyone who would like to create Back End in https://nodejs.org/en/ &amp; Typescript using Yarn

## How to use this project?

Set of commands to control the repository

-   use `yarn install` to install all dependencies
-   use `yarn lint:fix` to check for lint rules and run prettier
-   use `yarn health-check` to verify if the code is well written and is ready for testing
-   use `yarn build` to compile typescript file into new folder dist
-   use `yarn test` to run tests and check whether all services work
-   use `yarn start` to run application on localhost
-   use Visual Studio Code run and debug option "Launch Server" to debug back end

## What does this project do?

It is an HTTP REST Back End **Movie Database** that upon starting will expose 5 CRUD API that will allow you to control it.

**DEFAULT MAIN URL IS:** `http://localhost:3333/v1/api/movieAPI` - if you GET this you will get a list of all movies from the database.

If you are interested how does the REST API look like, see BEopenapi.yaml (use tools like Swagger Editor).

## Database

By default this Back End runs on port 3333 and has 3 options of saving the data:

1. Remote cloud Mongo Database
2. Local REDIS Database
3. Dirty InMemory Database for convenient use without other dependencies

Your default database will be in RAM in the Node.js program, so if you restart your service, you will loose all your data.

For REDIS DB we recommend docker via `docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest`

## Environment variables

To change behavior of the service, create .env file like this one:

```
# .env file
NODE_ENV="development"
HOST="localhost"
PORT=3333
LOG_LEVEL="DEBUG"
# -------  MONGO DB -------
# DATABASE_TYPE="MONGO"
# DATABASE_PORT=""
# DATABASE_HOST="apeltauer-node-db.rgfiddt.mongodb.net"
# DATABASE_USERNAME="tapeltauerext"
# DATABASE_PASSWORD="DbtE0CkAdnrgiM7x"
# DATABASE_BASE="mongodb+srv"
# DATABASE_ENVIRONMENT="cloud"
# -------  REDIS DB -------
# DATABASE_TYPE="REDIS"
# DATABASE_PORT=6379
# DATABASE_HOST="localhost"
# DATABASE_USERNAME=""
# DATABASE_PASSWORD=""
# DATABASE_BASE="redis"
# ------- RAM DB -------
DATABASE_TYPE="RAM"
```

And play with your settings. If you do not have file, you will get default settings which is port 3333 and RAM DB on localhost in development environment with log level = debug.

## Startup, Liveness & Readiness

 * If the application is running, you can verify it's startup status on an endpoint: `http://localhost:3333/health`
 * Liveness endpoint is on: `http://localhost:3333/info`
 * Readiness endpoint is on: `http://localhost:3333/metrics`

## Some other handy commands:

`package.json` contains set of interesting commands that you may or may not want to run separately. It is aimed to be cross-platform. Please report any issues.

`http://localhost:3333/v1/api/` will provide you a simple html Front End webpage for developer's usage only! Before moving to PROD, delete it!!!
