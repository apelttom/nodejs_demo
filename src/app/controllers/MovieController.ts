import { type Request, type Response } from 'express'
// import type * as mongoose from "mongoose";
import redisDatabase from '../../../src/database/Redis.database'
import DirtyDatabase from '../../database/Dirty.database'
import ListMovieService from '../services/ListMovieService'
import GetMovieService from '../services/GetMovieService'
import CreateMovieService from '../services/CreateMovieService'
import UpdateMovieService from '../services/UpdateMovieService'
import DeleteMovieService from '../services/DeleteMovieService'
import { getLocalConfig } from '../../configs/app.conf'
import { type MovieRequestBody } from '../interfaces/MovieRequestBody'
import ControllerUtils from '../utils/ControllerUtils'

class MovieController extends ControllerUtils {
  constructor() {
    super()

    this.store = this.store.bind(this)
    this.update = this.update.bind(this)
    this.index = this.index.bind(this)
    this.destroy = this.destroy.bind(this)
    this.show = this.show.bind(this)
  }

  /**
   * List an all movies from DB.
   * @param {Request} req
   * @param {Response} res
   */
  async index(req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
    if (getLocalConfig().database === 'mongoDB') {
      const promise = (async () => await ListMovieService.runMongo(req.query))()
      return await this.defaultHandler(res, promise)
    } else if (getLocalConfig().database === 'redis') {
      const repository = await redisDatabase.getRepositoryForSchema()
      const promise = (async () => await ListMovieService.runRedis(req.query, repository))()
      return await this.defaultHandler(res, promise)
    } else {
      const promise = ListMovieService.runInMemory(req.query, DirtyDatabase)
      return await this.defaultHandler(res, promise)
    }
  }

  /**
   * Return a specific movie under given ID.
   * @param {Request} req
   * @param {Response} res
   */
  async show(req: Request<{ _id: string }>, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
    const { _id } = req.params
    if (getLocalConfig().database === 'mongoDB') {
      const promise = (async () => await GetMovieService.runMongo(_id))()
      return await this.defaultHandler(res, promise)
    } else if (getLocalConfig().database === 'redis') {
      const repository = await redisDatabase.getRepositoryForSchema()
      const promise = (async () => await GetMovieService.runRedis(_id, repository))()
      return await this.defaultHandler(res, promise)
    } else {
      const promise = GetMovieService.runInMemory(_id, DirtyDatabase)
      return await this.defaultHandler(res, promise)
    }
  }

  /**
   * Insert a new movie.
   * @param {Request} req
   * @param {Response} res
   */
  async store(req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
    const movieData: MovieRequestBody = req.body
    if (getLocalConfig().database === 'mongoDB') {
      const promise = (async () => await CreateMovieService.runMongo(movieData))()
      return await this.defaultHandler(res, promise)
    } else if (getLocalConfig().database === 'redis') {
      const repository = await redisDatabase.getRepositoryForSchema()
      const promise = (async () => await CreateMovieService.runRedis(movieData, repository))()
      return await this.defaultHandler(res, promise)
    } else {
      const promise = CreateMovieService.runInMemory(movieData, DirtyDatabase)
      return await this.defaultHandler(res, promise)
    }
  }

  /**
   * Update a movie.
   * @param {Request} req
   * @param {Response} res
   */
  async update(req: Request<{ _id: string }>, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
    const { _id } = req.params
    const movieData: MovieRequestBody = req.body
    if (getLocalConfig().database === 'mongoDB') {
      const promise = (async () => await UpdateMovieService.runMongo(_id, movieData))()
      return await this.defaultHandler(res, promise)
    } else if (getLocalConfig().database === 'redis') {
      const repository = await redisDatabase.getRepositoryForSchema()
      const promise = (async () => await UpdateMovieService.runRedis(_id, req.body, repository))()
      return await this.defaultHandler(res, promise)
    } else {
      const promise = UpdateMovieService.runInMemory(_id, req.body, DirtyDatabase)
      return await this.defaultHandler(res, promise)
    }
  }

  /**
   * Remove an movie.
   * @param {Request} req
   * @param {Response} res
   */
  async destroy(req: Request<{ _id: string }>, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
    const { _id } = req.params
    if (getLocalConfig().database === 'mongoDB') {
      const promise = (async () => await DeleteMovieService.runMongo(_id))()
      return await this.defaultHandler(res, promise)
    } else if (getLocalConfig().database === 'redis') {
      const repository = await redisDatabase.getRepositoryForSchema()
      const promise = (async () => await DeleteMovieService.runRedis(_id, repository))()
      return await this.defaultHandler(res, promise)
    } else {
      const promise = DeleteMovieService.runInMemory(_id, DirtyDatabase)
      return await this.defaultHandler(res, promise)
    }
  }
}

export default new MovieController()
