import { EntityId, type Repository } from 'redis-om';
import MongoMovie from '../schemas/MongoMovieSchema';
import { type MovieEntity } from '../interfaces/MovieEntity';

class ListMovieService {
    /**
     * Return all movies filtered by a specific string, saved in MongoDB
     *
     * @param {Object} filter
     * @returns {Object}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async runMongo(filter: any): Promise<any> {
        // using filter will get all results from DB and then returns it
        return await MongoMovie.find(filter);
    }

    /**
     * Return all movies (unfiltered) saved in REDIS DB
     *
     * @param {unknown} filter
     * @returns {RedisMovie[]}
     */
    async runRedis(filter: unknown, repository: Repository): Promise<MovieEntity[]> {
        // ToDo: Add filter funcitonality
        const entities = await repository.search().return.all();
        const movies: MovieEntity[] = entities.map((entity) => ({
            uuid: entity[EntityId] ?? 'NoUUID',
            name: (entity.name as string) ?? 'NoName',
            releasedDate: (entity.releasedDate as Date) ?? null,
            genders: (entity.genders as string[]) ?? []
        }));
        return movies;
    }

    /**
     * Return all movies saved in XXXXS
     *
     * @param {unknown} filter
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async runInMemory(filter: unknown, database: any): Promise<MovieEntity[]> {
        const movieArray: MovieEntity[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        database.forEach(function (key: any, val: any) {
            // console.log('Found key: %s, val: %j', key, val);
            const name = val.name;
            const releasedDate = val.releasedDate;
            const genders = val.genders;
            movieArray.push({ key, name, releasedDate, genders });
        });
        return movieArray;
    }
}

export default new ListMovieService();
