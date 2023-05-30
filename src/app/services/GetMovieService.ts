import { type Document } from 'mongoose';
import { type Repository } from 'redis-om';
import { type MovieRequestBody } from '../interfaces/MovieRequestBody';
import MongoMovie from '../schemas/MongoMovieSchema';
import { type RedisMovie } from '../schemas/RedisMovieSchema';

class GetExampleService {
    /**
     * Return a movie based on _id saved in MongoDB
     *
     * If this movie wasn't found, return 404 by default.
     * @param {string} _id
     * @returns {Document}
     */
    async runMongo(_id: string): Promise<Document> {
        // Will try to find an idea in the DB using given DB ID. If not found, throws an error
        const movie = await MongoMovie.findById(_id);
        if (movie === null) throw new Error('Idea not found in DB. 404');
        return movie;
    }

    /**
     * Return a movie based on _id saved in REDIS database
     *
     * If this movie wasn't found, return 404 by default.
     * @param {string} _id
     * @returns {RedisMovie}
     */
    async runRedis(_id: string, repository: Repository<RedisMovie>): Promise<RedisMovie> {
        // Will try to find a movie in the REDIS DB using given DB ID. If not found, throws an error
        const movie = await repository.fetch(_id);
        if (movie === null) throw new Error('Idea not found in DB. 404');
        return movie;
    }

    /**
     * Return a movie based on _id saved in XXXXS
     *
     * @param {string} _id
     * @returns {MovieRequestBody}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async runInMemory(_id: string, database: any): Promise<MovieRequestBody> {
        const movie = database.get(_id);
        if (movie === null) throw new Error('Idea not found in DB. 404');
        // return new version of the movie
        const uuid = _id;
        const name = movie.name;
        const releasedDate = movie.releasedDate;
        const genders = movie.genders;
        const savedMovie: MovieRequestBody = { uuid, name, releasedDate, genders };
        return savedMovie;
    }
}

export default new GetExampleService();
