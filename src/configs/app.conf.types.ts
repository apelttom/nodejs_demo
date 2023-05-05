// Types used for application configuration. If you would like to use ENV variables instead, take a look on some guide on Google
// import { Level } from "pino";
export type Environment =
  // The service running in a production cluster available for customers
  | 'production'
  // The service running in a test environment
  | 'test'
  // The service running in a development environment
  | 'development'
  // The service running locally on a development machine
  | 'local'

export type Database =
  // Application depend on Mongo DB
  | 'mongoDB'
  // Application depend on Redis Database
  | 'redis'
  // Application does not depend on Database, but you may loose your data if you shut it down
  | 'RAM'

export interface Config {
  environment: Environment
  //   logLevel: Level;
  port: number
  database: Database
}

export interface ProcessVariables {
  ENV?: Environment
  //   LOG_LEVEL?: Level;
}
