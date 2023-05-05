import { type RedisConfig } from './db.redis.types'

const environment = 'development'
const port = 6379
const host = 'localhost'
const credentials = ''
const base = 'redis'

export function getRedisLocalConfig(): RedisConfig {
  const url = `${base}://${credentials}${host}:${port}`

  return {
    redisURL: url,
    redisEnvironment: environment,
    redisPort: port,
    redisHost: host
  }
}
