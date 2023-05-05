// import mogoDatabase from "../../../src/database/Mongo.database";
import RedisDatabase from '../../../src/database/Redis.database'
import DirtyDatabase from '../../../src/database/Dirty.database'
import CreateMovieService from '../../../src/app/services/CreateMovieService'
import { getLocalConfig } from '../../../src/configs/app.conf'
import ListMovieService from '../../../src/app/services/ListMovieService'
import type MongoMovie from '../../../src/app/schemas/MongoMovieSchema'
import GetMovieService from '../../../src/app/services/GetMovieService'
import UpdateMovieService from '../../../src/app/services/UpdateMovieService'
import DeleteMovieService from '../../../src/app/services/DeleteMovieService'
import { type MovieRequestBody } from '../../../src/app/interfaces/MovieRequestBody'

describe("This test'll run all CRUD operations on MovieController (plus List).", () => {
  it('should be able to create a new movie into the database', async () => {
    const fake = {
      name: 'The Avengers',
      releasedDate: new Date('2023-04-27T00:00:00.000Z'),
      genders: ['action', 'sci-fi']
    }
    if (getLocalConfig().database === 'mongoDB') {
      // await mogoDatabase.mongo();
      const postMovie = await CreateMovieService.runMongo(fake)
      const { _id, name, releasedDate, genders } = postMovie.toObject()
      // ID
      expect(_id).not.toBeNull()
      expect(_id.toString()).toHaveLength(24)
      // Movie Name
      expect(name).not.toBeNull()
      expect(name).toBe('The Avengers')
      // Movie released Date
      expect(releasedDate).not.toBeNull()
      expect(releasedDate.getFullYear()).toBe(2023)
      // Movie genders
      expect(genders).not.toBeNull()
      expect(genders).toHaveLength(2)
      expect(genders).toContain('sci-fi')
      // await mogoDatabase.mongoConnection.disconnect();
    }
    if (getLocalConfig().database === 'redis') {
      await RedisDatabase.connectToDatabase()
      const repository = await RedisDatabase.getRepositoryForSchema()
      const postMovie = await CreateMovieService.runRedis(fake, repository)
      const entityId = postMovie.entityId
      // ID
      expect(entityId).not.toBeNull()
      expect(entityId.toString()).toHaveLength(26)
      await RedisDatabase.disconnectDatabase()
    }
    if (getLocalConfig().database === 'RAM') {
      const postMovie = await CreateMovieService.runInMemory(fake, DirtyDatabase)
      // ID
      expect(postMovie.uuid).not.toBeNull()
      expect(postMovie.uuid.toString()).toHaveLength(36)
      // Movie Name
      expect(postMovie.name).not.toBeNull()
      expect(postMovie.name).toBe('The Avengers')
      // Movie released Date
      expect(postMovie.releasedDate).not.toBeNull()
      expect(postMovie.releasedDate.getFullYear()).toBe(2023)
      // Movie genders
      expect(postMovie.genders).not.toBeNull()
      expect(postMovie.genders).toHaveLength(2)
      expect(postMovie.genders).toContain('sci-fi')
    }
  })

  it('should be able to get a movie from the database', async () => {
    const fake = {
      name: 'Fast & Furious',
      releasedDate: new Date('2004-04-27T00:00:00.000Z'),
      genders: ['action', 'thriller']
    }
    if (getLocalConfig().database === 'mongoDB') {
      // await mogoDatabase.mongo();
      const postMovie = await CreateMovieService.runMongo(fake)
      const postID = postMovie._id

      const getMovie = await GetMovieService.runMongo(postID)
      const getID = getMovie._id
      const { name, releasedDate, genders } = getMovie.toObject()
      // ID
      expect(getID).not.toBeNull()
      expect(getID.toString()).toBe(postID.toString())
      expect(getID.toString()).toHaveLength(24)
      // Movie Name
      expect(name).not.toBeNull()
      expect(name).toBe('Fast & Furious')
      // Movie released Date
      expect(releasedDate).not.toBeNull()
      expect(releasedDate.getFullYear()).toBe(2004)
      // Movie genders
      expect(genders).not.toBeNull()
      expect(genders).toHaveLength(2)
      expect(genders).toContain('thriller')
      // await mogoDatabase.mongoConnection.disconnect();
    }
    if (getLocalConfig().database === 'redis') {
      await RedisDatabase.connectToDatabase()
      const repository = await RedisDatabase.getRepositoryForSchema()
      const postMovie = await CreateMovieService.runRedis(fake, repository)
      const postID = postMovie.entityId
      const getMovie = await GetMovieService.runRedis(postID, repository)
      const getID = getMovie.entityId
      // ID
      expect(getID).not.toBeNull()
      expect(getID.toString()).toBe(postID.toString())
      expect(getID.toString()).toHaveLength(26)
      await RedisDatabase.disconnectDatabase()
    }
    if (getLocalConfig().database === 'RAM') {
      const postMovie = await CreateMovieService.runInMemory(fake, DirtyDatabase)
      const postID = postMovie.uuid
      const getMovie = await GetMovieService.runInMemory(postID.toString(), DirtyDatabase)
      const getID = getMovie.uuid
      // ID
      expect(getID).not.toBeNull()
      expect(getID.toString()).toBe(postID.toString())
      expect(getID.toString()).toHaveLength(36)
      // Movie Name
      expect(getMovie.name).not.toBeNull()
      expect(getMovie.name).toBe('Fast & Furious')
      // Movie released Date
      expect(getMovie.releasedDate).not.toBeNull()
      expect(getMovie.releasedDate.getFullYear()).toBe(2004)
      // Movie genders
      expect(getMovie.genders).not.toBeNull()
      expect(getMovie.genders).toHaveLength(2)
      expect(getMovie.genders).toContain('action')
    }
  })

  it('should be able to update a movie in the database', async () => {
    const fake1 = {
      name: 'The Hobbit',
      releasedDate: new Date('2018-04-27T00:00:00.000Z'),
      genders: ['fantasy', 'fairy-tale']
    }
    const fake2 = {
      name: 'Lord of the Rings',
      releasedDate: new Date('2009-04-27T00:00:00.000Z'),
      genders: ['fantasy', 'adventure', 'action']
    }
    if (getLocalConfig().database === 'mongoDB') {
      // await mogoDatabase.mongo();
      const postMovie = await CreateMovieService.runMongo(fake1)
      const postID = postMovie._id

      const updateMovie = await UpdateMovieService.runMongo(postID, fake2)
      const updateID = updateMovie._id
      const { name, releasedDate, genders } = updateMovie.toObject()
      // ID
      expect(updateID).not.toBeNull()
      expect(updateID.toString()).toBe(postID.toString())
      expect(updateID.toString()).toHaveLength(24)
      // Movie Name
      expect(name).not.toBeNull()
      expect(name).toBe('Lord of the Rings')
      // Movie released Date
      expect(releasedDate).not.toBeNull()
      expect(releasedDate.getFullYear()).toBe(2009)
      // Movie genders
      expect(genders).not.toBeNull()
      expect(genders).toHaveLength(3)
      expect(genders).toContain('adventure')
      // await mogoDatabase.mongoConnection.disconnect();
    }
    if (getLocalConfig().database === 'redis') {
      await RedisDatabase.connectToDatabase()
      const repository = await RedisDatabase.getRepositoryForSchema()
      const postMovie = await CreateMovieService.runRedis(fake1, repository)
      const postID = postMovie.entityId
      const updateMovie = await UpdateMovieService.runRedis(postID, fake2, repository)
      const updateID = updateMovie.entityId
      // ID
      expect(updateID).not.toBeNull()
      expect(updateID.toString()).toBe(postID.toString())
      expect(updateID.toString()).toHaveLength(26)
      await RedisDatabase.disconnectDatabase()
    }
    if (getLocalConfig().database === 'RAM') {
      const postMovie = await CreateMovieService.runInMemory(fake1, DirtyDatabase)
      const postID = postMovie.uuid
      const updateMovie = await UpdateMovieService.runInMemory(postID.toString(), fake2, DirtyDatabase)
      const updateID = updateMovie.uuid
      // ID
      expect(updateID).not.toBeNull()
      expect(updateID.toString()).toBe(postID.toString())
      expect(updateID.toString()).toHaveLength(36)
      // Movie Name
      expect(updateMovie.name).not.toBeNull()
      expect(updateMovie.name).toBe('Lord of the Rings')
      // Movie released Date
      expect(updateMovie.releasedDate).not.toBeNull()
      expect(updateMovie.releasedDate.getFullYear()).toBe(2009)
      // Movie genders
      expect(updateMovie.genders).not.toBeNull()
      expect(updateMovie.genders).toHaveLength(3)
      expect(updateMovie.genders).toContain('adventure')
    }
  })

  it('should be able to delete a movie from the database', async () => {
    const fake = {
      name: 'Stardust',
      releasedDate: new Date('2015-04-27T00:00:00.000Z'),
      genders: ['fantasy', 'comedy']
    }
    if (getLocalConfig().database === 'mongoDB') {
      // await mogoDatabase.mongo();
      const postMovie = await CreateMovieService.runMongo(fake)
      const postID = postMovie._id

      const deleteMovie = await DeleteMovieService.runMongo(postID)
      expect(deleteMovie).not.toBeNull()
      if (deleteMovie !== null) {
        const deleteID = deleteMovie._id
        // ID
        expect(deleteID).not.toBeNull()
        expect(deleteID.toString()).toBe(postID.toString())
        expect(deleteID.toString()).toHaveLength(24)
        async function create(): Promise<void> {
          await GetMovieService.runMongo(deleteID)
        }
        // Movie should not be present in the database so we expect an error
        void expect(create()).rejects.toThrowError()
      }
      // await mogoDatabase.mongoConnection.disconnect();
    }
    if (getLocalConfig().database === 'redis') {
      await RedisDatabase.connectToDatabase()
      const repository = await RedisDatabase.getRepositoryForSchema()
      const postMovie = await CreateMovieService.runRedis(fake, repository)
      const postID = postMovie.entityId
      const deleteMovie = await DeleteMovieService.runRedis(postID, repository)
      const deleteID = deleteMovie.entityId
      // ID
      expect(deleteID).not.toBeNull()
      expect(deleteID.toString()).toBe(postID.toString())
      expect(deleteID.toString()).toHaveLength(26)
      // async function create(): Promise<void> {
      //   await GetMovieService.runRedis(deleteID, repository);
      // }
      // // Movie should not be present in the database so we expect an error
      // void expect(create()).rejects.toThrowError();
      await RedisDatabase.disconnectDatabase()
    }
    if (getLocalConfig().database === 'RAM') {
      const postMovie = await CreateMovieService.runInMemory(fake, DirtyDatabase)
      const postID = postMovie.uuid

      const deleteMovie = await DeleteMovieService.runInMemory(postID.toString(), DirtyDatabase)
      expect(deleteMovie).not.toBeNull()
      if (deleteMovie !== null) {
        const deleteID = deleteMovie.uuid
        // ID
        expect(deleteID).not.toBeNull()
        expect(deleteID.toString()).toBe(postID.toString())
        expect(deleteID.toString()).toHaveLength(36)
        // async function create(): Promise<void> {
        //   await GetMovieService.runInMemory(deleteID, DirtyDatabase);
        // }
        // // Movie should not be present in the database so we expect an error
        // void expect(create()).rejects.toThrowError();
      }
    }
  })

  it('should be able to list all movies into the database', async () => {
    if (getLocalConfig().database === 'mongoDB') {
      // await mogoDatabase.mongo();
      const savedMovies: Array<typeof MongoMovie> = await ListMovieService.runMongo({})
      expect(savedMovies).not.toBeNull()
      expect(savedMovies.length).toBeGreaterThan(1)
      // await mogoDatabase.mongoConnection.disconnect();
    }
    if (getLocalConfig().database === 'redis') {
      await RedisDatabase.connectToDatabase()
      const repository = await RedisDatabase.getRepositoryForSchema()
      const savedMovies = await ListMovieService.runRedis({}, repository)
      expect(savedMovies).not.toBeNull()
      expect(savedMovies.length).toBeGreaterThan(1)
      await RedisDatabase.disconnectDatabase()
    }
    if (getLocalConfig().database === 'RAM') {
      const savedMovies: MovieRequestBody[] = await ListMovieService.runInMemory({}, DirtyDatabase)
      expect(savedMovies).not.toBeNull()
      expect(savedMovies.length).toBeGreaterThan(1)
    }
  })

  //   it("should not be able to create a new movie without a name.", async () => {
  //         async function create(): Promise<void> {
  //           await CreateMovieService.runMongo({name: null});
  //         }
  //         void expect(create()).rejects.toThrowError();
  //     }
  //   });
})
