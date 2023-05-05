import { type Document } from 'mongoose'
import { type Repository } from 'redis-om'
import MongoMovie from '../schemas/MongoMovieSchema'
import { type RedisMovie } from '../schemas/RedisMovieSchema'
import { type MovieRequestBody } from '../interfaces/MovieRequestBody'
import crypto from 'crypto'

class CreateMovieService {
  /**
   * Create a new Movie
   * @param movie
   * @param {String} movie.name
   * @param {Date} movie.releasedDate
   * @param {String[]} movie.genders
   * @returns {Promise}
   */
  async runMongo(data: MovieRequestBody): Promise<Document> {
    // create a new movie from data, insert into DB and then returns it

    const movie = await MongoMovie.create(data)
    return movie
  }

  async runRedis(data: MovieRequestBody, repository: Repository<RedisMovie>): Promise<RedisMovie> {
    // create a new movie from data, insert into DB and then returns it

    const movie = await repository.createAndSave(data)
    return movie
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async runInMemory(data: MovieRequestBody, database: any): Promise<MovieRequestBody> {
    const uuid = crypto.randomUUID()
    database.set(uuid, data)
    const name = data.name
    const releasedDate = data.releasedDate
    const genders = data.genders
    const savedMovie: MovieRequestBody = { uuid, name, releasedDate, genders }
    return savedMovie
  }
}

export default new CreateMovieService()
