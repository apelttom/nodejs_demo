// Types used for database configuration. If you would like to use ENV variables instead, take a look on some guide on Google
export type RedisEnvironment =
  // The service running in a production cluster available for customers
  | 'development'
  // The service running locally on a development machine
  | 'myOwnEnvironment'

export interface RedisConfig {
  redisURL: string
  redisEnvironment: RedisEnvironment
  redisPort: number
  redisHost: string
}
