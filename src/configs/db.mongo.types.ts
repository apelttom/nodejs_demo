// Types used for database configuration. If you would like to use ENV variables instead, take a look on some guide on Google
export type MongoEnvironment =
  // The service running in a production cluster available for customers
  | 'development'
  // The service running locally on a development machine
  | 'myOwnEnvironment'

export interface MongoConfig {
  mongoURL: string
  mongoEnvironment: MongoEnvironment
  mongoPort: number
  mongoHost: string
  mongoDatabase: string
  mongoUsername: string
  mongoPassword: string
  srv: boolean
}
