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

## Environment variables

You can change behavior of the application using environment variables. There is an example file called `example.env`.

How to have your own localhost settings:

1. Create new file .env
2. Copy content of example.env to .env
3. Modify the file so you will have proper DB, host, port, etc.

Explanation of the environment variables:

`NODE_ENV` - development | test | production (this defines in which environment application runs and how tight security is)
`HOST` - This does not do much, only helps with logging on the start of the app when host & port are logged
`PORT` - This is very important, because it tells the application to run on a specific port
`LOG_LEVEL` - This does not do much so far, but in future will be controlling how much the application logs
`DATABASE_TYPE` - MONGO | REDIS | RAM (will determine where the data is stored). Default is RAM
`DATABASE_PORT` - specify on which port the DB is running (no default value)
`DATABASE_HOST` - specify the server on which the DB is running (ip address or DNS, no default value)
`DATABASE_USERNAME` - username for db connection (no default value)
`DATABASE_PASSWORD`- password for the db connection. Will be URL encoded
`DATABASE_BASE` - the first part of the connection url to the database. Can be either redis or mongodb+srv or mongo (no default value)
`DATABASE_ENVIRONMENT` - either cloud or local (if you use cloud MongoDB, no default value)

And play with your settings. If you do not have .env file, you will get default settings which is port 3333 and RAM DB on localhost in development environment with log level = debug.

## Some other handy commands: 

`package.json` contains set of interesting commands that you may or may not want to run separately. It is aimed to be cross-platform. Please report any issues.
