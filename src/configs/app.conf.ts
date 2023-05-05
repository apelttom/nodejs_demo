// Application configuration:
// Acceptable Request Payload Size, Blacklisting IPs or Regions, etc.
// for more options here see https://traveling-coderman.net/code/node-architecture/configuration-management/
import { type Config } from './app.conf.types'

export function getLocalConfig(): Config {
  return {
    environment: 'development',
    port: 3333,
    //   logLevel: processVariables.LOG_LEVEL ?? "debug",
    // database: 'mongoDB',
    // database: 'redis',
    database: 'RAM'
  }
}

export function getProdConfig(): Config {
  return {
    environment: 'production',
    port: 3333,
    //   logLevel: processVariables.LOG_LEVEL ?? "debug",
    // database: 'mongoDB',
    // database: 'redis',
    database: 'RAM'
  }
}
