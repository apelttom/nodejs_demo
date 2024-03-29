import { type Document } from 'mongoose';
import { type Entity, type Repository } from 'redis-om';
import MongoMovie from '../schemas/MongoMovieSchema';
import { type MovieEntity } from '../interfaces/MovieEntity';
import { v4 as uuidv4 } from 'uuid';

class CreateMovieService {
    /**
     * Create a new Movie
     * @param movie
     * @param {String} movie.name
     * @param {Date} movie.releasedDate
     * @param {String[]} movie.genders
     * @returns {Promise}
     */
    async runMongo(data: MovieEntity): Promise<Document> {
        // create a new movie from data, insert into DB and then returns it

        const movie = await MongoMovie.create(data);
        return movie;
    }

    async runRedis(data: MovieEntity, repository: Repository): Promise<Entity> {
        // create a new movie from data, insert into DB and then returns it

        const movie = await repository.save(data);
        return movie;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async runInMemory(data: MovieEntity, database: any): Promise<MovieEntity> {
        const uuid = uuidv4();
        database.set(uuid, data);
        const name = data.name;
        const releasedDate = data.releasedDate;
        const genders = data.genders;
        const savedMovie: MovieEntity = { uuid, name, releasedDate, genders };
        return savedMovie;
    }
}

export default new CreateMovieService();
