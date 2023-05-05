import { type Document } from 'mongoose'
import { type Repository } from 'redis-om'
import { type MovieRequestBody } from '../interfaces/MovieRequestBody'
import MongoMovie from '../schemas/MongoMovieSchema'
import { type RedisMovie } from '../schemas/RedisMovieSchema'
import GetMovieService from './GetMovieService'

class UpdateExampleService {
  /**
   * Update movie in the Mongo DB based on the ID from request
   * @param {string} _id
   * @param {MovieRequestBody} data
   * @returns {Document}
   */
  async runMongo(_id: string, data: MovieRequestBody): Promise<Document> {
    // finds a movie in the Mongo DB and updates it
    await MongoMovie.findByIdAndUpdate(_id, data)
    const movie = await GetMovieService.runMongo(_id)
    return movie
  }

  /**
   * Update movie in the Mongo DB based on the ID from request
   * @param {string} _id
   * @param {MovieRequestBody} data
   * @returns {RedisMovie}
   */
  async runRedis(_id: string, data: MovieRequestBody, repository: Repository<RedisMovie>): Promise<RedisMovie> {
    // Will try to find a movie in the REDIS DB using given DB ID. If not found, throws an error
    const movie = await repository.fetch(_id)
    if (movie === null) throw new Error('Idea not found in DB. 404')
    // set up new values or nulls if not present
    movie.name = data.name ?? null
    movie.releasedDate = data.releasedDate ?? null
    movie.genders = data.genders ?? null
    // update movie in the database
    await repository.save(movie)
    // return new version of the movie
    return movie
  }

  /**
   * Update a movie based on _id saved in XXXXS
   *
   * @param {string} _id
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async runInMemory(_id: string, data: MovieRequestBody, database: any): Promise<MovieRequestBody> {
    const movie = database.get(_id)
    if (movie === null) throw new Error('Idea not found in DB. 404')
    // set up new values or nulls if not present
    movie.name = data.name ?? null
    movie.releasedDate = data.releasedDate ?? null
    movie.genders = data.genders ?? null
    // update movie in the database
    database.set(_id, movie)
    // return new version of the movie
    const uuid = _id
    const name = data.name
    const releasedDate = data.releasedDate
    const genders = data.genders
    const updatedMovie: MovieRequestBody = { uuid, name, releasedDate, genders }
    return updatedMovie
  }
}

export default new UpdateExampleService()
