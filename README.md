# BE-nodeJS-starter

This is a starter kit for anyone who would like to create Back End in https://nodejs.org/en/ &amp; Typescript using Yarn

## How to use this project?

Set of commands to control the repository

- use `yarn install` to install all dependencies
- use `yarn lint:fix` to check for lint rules and run prettier
- use `yarn health-check` to verify if the code is well written and is ready for testing
- use `yarn build` to compile typescript file into new folder dist
- use `yarn test` to run tests and check whether all services work
- use `yarn start` to run application on localhost
- use Visual Studio Code run and debug option "Launch Server" to debug back end

## What does this project do?

It is an HTTP REST Back End that upon starting (on localhost or anywhere else) will expose 4 CRUD API under port 3333 (default).

**DEFAULT MAIN URL IS:** `http://localhost:3333/v1/api/movieAPI`

If you are interested how does the REST API look like, see BEopenapi.yaml (use tools like Swagger Editor).

By default this Back End has 3 options of saving the data:

1. Remote cloud Mongo Database
2. Local REDIS Database
3. Dirty InMemory Database for convenient use without other dependencies

You can define this behavior in the file **app.conf.ts** in the variable _database_.

For REDIS DB we recommend docker via `docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest`

## Some other handy commands:

To use prettier run: `yarn prettier --write .`

To run tests run: `yarn test`

To develop run `yarn dev`

To run production version run `yarn build` and then `yarn start`
