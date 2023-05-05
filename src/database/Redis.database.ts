import { Client, type Repository } from 'redis-om'
import movieSchema from '../app/schemas/RedisMovieSchema'
import { type RedisMovie } from '../app/schemas/RedisMovieSchema'

import { getRedisLocalConfig } from '../configs/db.redis.conf'

class RedisDatabase {
  client: Client = new Client()

  async connectToDatabase(): Promise<void> {
    /* pulls the Redis URL from app settings */
    const url = getRedisLocalConfig().redisURL
    /* create and open the Redis OM Client */
    await this.client.open(url)
  }

  async disconnectDatabase(): Promise<void> {
    await this.client.close()
  }

  async getRepositoryForSchema(): Promise<Repository<RedisMovie>> {
    /* use the client to create a Repository just for Movies */
    const movieRepository = this.client.fetchRepository(movieSchema)
    /* create the index for Movie */
    await movieRepository.createIndex()
    return movieRepository
  }
}

export default new RedisDatabase()
