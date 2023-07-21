import { createClient } from 'redis';
import { type RedisConnection, Repository } from 'redis-om';
import movieSchema from '../app/schemas/RedisMovieSchema';
// import { type RedisMovie } from '../app/schemas/RedisMovieSchema';

import { getRedisURL } from '../configs/db.redis.conf';

class RedisDatabase {
    // client: Client = new Client();
    redisClient: RedisConnection | undefined;

    async connectToDatabase(): Promise<void> {
        this.redisClient = createClient({
            url: getRedisURL()
        });
        /* logs errors on creating Redis client if present */
        this.redisClient.on('error', (err: Error) => {
            console.log('Redis Client Error', err);
        });
        /* pulls the Redis URL from app settings */
        // const url = getRedisURL();
        /* create and open the Redis OM Client */
        // await this.client.open(url);
        /* connect to the database given by URL via function getRedisURL */
        await this.redisClient.connect();
    }

    async disconnectDatabase(): Promise<void> {
        // await this.client.close();
        /* Verify that client has been already initialized */
        if (this.redisClient !== undefined)
            /* close the connection to the Redis DB */
            await this.redisClient.quit();
    }

    async getRepositoryForSchema(): Promise<Repository> {
        /* use the client to create a Repository just for Movies */
        // const movieRepository = this.client.fetchRepository(movieSchema);
        /* Verify that client has been already initialized */
        let movieRepository;
        if (this.redisClient !== undefined) movieRepository = new Repository(movieSchema, this.redisClient);
        else
            movieRepository = new Repository(
                movieSchema,
                createClient({
                    url: getRedisURL()
                })
            );
        /* create the index for Movie Repository */
        await movieRepository.createIndex();
        return movieRepository;
    }
}

export default new RedisDatabase();
