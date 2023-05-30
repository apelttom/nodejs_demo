import { type Document } from 'mongoose';
import { type Repository } from 'redis-om';
import { type MovieDeleteResponse } from '../interfaces/MovieDeleteResponse';
import MongoMovie from '../schemas/MongoMovieSchema';
import { type RedisMovie } from '../schemas/RedisMovieSchema';

class DeleteExampleService {
    /**
     * Delete a movie under ID in MongoDB
     * @param {string} _id
     * @returns {Document}
     */
    async runMongo(_id: string): Promise<Document | null> {
        // finds an idea in the DB and removes it
        return await MongoMovie.findByIdAndRemove(_id);
    }

    /**
     * Delete a movie under ID in REDIS DB
     * @param {string} _id
     * @returns {MovieDeleteResponse}
     */
    async runRedis(_id: string, repository: Repository<RedisMovie>): Promise<MovieDeleteResponse> {
        await repository.remove(_id);
        return { entityId: _id };
    }

    /**
     * Delete a movie based on _id saved in XXXXS
     *
     * @param {string} _id
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async runInMemory(_id: string, database: any): Promise<{ uuid: string }> {
        database.rm(_id);
        return { uuid: _id };
    }
}

export default new DeleteExampleService();
