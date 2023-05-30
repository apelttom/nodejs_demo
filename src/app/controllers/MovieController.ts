import { type Request, type Response } from 'express';
import redisDatabase from '../../../src/database/Redis.database';
import DirtyDatabase from '../../database/Dirty.database';
import ListMovieService from '../services/ListMovieService';
import GetMovieService from '../services/GetMovieService';
import CreateMovieService from '../services/CreateMovieService';
import UpdateMovieService from '../services/UpdateMovieService';
import DeleteMovieService from '../services/DeleteMovieService';
import { type MovieRequestBody } from '../interfaces/MovieRequestBody';
import ControllerUtils from '../utils/ControllerUtils';
import assert from 'assert';

class MovieController extends ControllerUtils {
    constructor() {
        super();

        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
        this.index = this.index.bind(this);
        this.destroy = this.destroy.bind(this);
        this.show = this.show.bind(this);
    }

    /**
     * List an all movies from DB.
     * @param {Request} req
     * @param {Response} res
     */
    async index(req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
        const databaseType = process.env.DATABASE_TYPE == null ? 'RAM' : process.env.DATABASE_TYPE;
        if (databaseType === 'MONGO') {
            const promise = (async () => await ListMovieService.runMongo(req.query))();
            return await this.defaultHandler(res, promise);
        } else if (databaseType === 'REDIS') {
            const repository = await redisDatabase.getRepositoryForSchema();
            const promise = (async () => await ListMovieService.runRedis(req.query, repository))();
            return await this.defaultHandler(res, promise);
        } else if (databaseType === 'RAM') {
            const promise = ListMovieService.runInMemory(req.query, DirtyDatabase);
            return await this.defaultHandler(res, promise);
        } else {
            console.error('GET all movies. Database environment variable is not properly set.');
            assert.ok(false, 'This should never happen. GET all movies. Please contact the developer.');
        }
    }

    /**
     * Return a specific movie under given ID.
     * @param {Request} req
     * @param {Response} res
     */
    async show(req: Request<{ _id: string }>, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
        const databaseType = process.env.DATABASE_TYPE == null ? 'RAM' : process.env.DATABASE_TYPE;
        const { _id } = req.params;
        if (databaseType === 'MONGO') {
            const promise = (async () => await GetMovieService.runMongo(_id))();
            return await this.defaultHandler(res, promise);
        } else if (databaseType === 'REDIS') {
            const repository = await redisDatabase.getRepositoryForSchema();
            const promise = (async () => await GetMovieService.runRedis(_id, repository))();
            return await this.defaultHandler(res, promise);
        } else if (databaseType === 'RAM') {
            const promise = GetMovieService.runInMemory(_id, DirtyDatabase);
            return await this.defaultHandler(res, promise);
        } else {
            console.error(' GET a movie. Database environment variable is not properly set.');
            assert.ok(false, 'This should never happen. GET a movie. Please contact the developer.');
        }
    }

    /**
     * Insert a new movie.
     * @param {Request} req
     * @param {Response} res
     */
    async store(req: Request, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
        const databaseType = process.env.DATABASE_TYPE == null ? 'RAM' : process.env.DATABASE_TYPE;
        const movieData: MovieRequestBody = req.body;
        if (databaseType === 'MONGO') {
            const promise = (async () => await CreateMovieService.runMongo(movieData))();
            return await this.defaultHandler(res, promise);
        } else if (databaseType === 'REDIS') {
            const repository = await redisDatabase.getRepositoryForSchema();
            const promise = (async () => await CreateMovieService.runRedis(movieData, repository))();
            return await this.defaultHandler(res, promise);
        } else if (databaseType === 'RAM') {
            const promise = CreateMovieService.runInMemory(movieData, DirtyDatabase);
            return await this.defaultHandler(res, promise);
        } else {
            console.error('POST create a movie. Database environment variable is not properly set.');
            assert.ok(false, 'This should never happen. POST create a movie. Please contact the developer.');
        }
    }

    /**
     * Update a movie.
     * @param {Request} req
     * @param {Response} res
     */
    async update(req: Request<{ _id: string }>, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
        const databaseType = process.env.DATABASE_TYPE == null ? 'RAM' : process.env.DATABASE_TYPE;
        const { _id } = req.params;
        const movieData: MovieRequestBody = req.body;
        if (databaseType === 'MONGO') {
            const promise = (async () => await UpdateMovieService.runMongo(_id, movieData))();
            return await this.defaultHandler(res, promise);
        } else if (databaseType === 'REDIS') {
            const repository = await redisDatabase.getRepositoryForSchema();
            const promise = (async () => await UpdateMovieService.runRedis(_id, req.body, repository))();
            return await this.defaultHandler(res, promise);
        } else if (databaseType === 'RAM') {
            const promise = UpdateMovieService.runInMemory(_id, req.body, DirtyDatabase);
            return await this.defaultHandler(res, promise);
        } else {
            console.error('PUT update a movie. Database environment variable is not properly set.');
            assert.ok(false, 'This should never happen. PUT update a movie. Please contact the developer.');
        }
    }

    /**
     * Remove an movie.
     * @param {Request} req
     * @param {Response} res
     */
    async destroy(req: Request<{ _id: string }>, res: Response): Promise<Response<unknown, Record<string, unknown>>> {
        const databaseType = process.env.DATABASE_TYPE == null ? 'RAM' : process.env.DATABASE_TYPE;
        const { _id } = req.params;
        if (databaseType === 'MONGO') {
            const promise = (async () => await DeleteMovieService.runMongo(_id))();
            return await this.defaultHandler(res, promise);
        } else if (databaseType === 'REDIS') {
            const repository = await redisDatabase.getRepositoryForSchema();
            const promise = (async () => await DeleteMovieService.runRedis(_id, repository))();
            return await this.defaultHandler(res, promise);
        } else if (databaseType === 'RAM') {
            const promise = DeleteMovieService.runInMemory(_id, DirtyDatabase);
            return await this.defaultHandler(res, promise);
        } else {
            console.error('DELETE remove a movie. Database environment variable is not properly set.');
            assert.ok(false, 'This should never happen. DELETE remove a movie. Please contact the developer.');
        }
    }
}

export default new MovieController();
