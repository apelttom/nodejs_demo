/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

// import mongoMovieController from '../app/controllers/MongoMovieController'
import movieController from '../app/controllers/MovieController'

const movieAPIRoutes = Router()

/**
 * Will be triggered by http://localhost:3333/v1/api/movieAPI/
 */
movieAPIRoutes.route('/').post(movieController.store).get(movieController.index)

/**
 * Will be triggered by http://localhost:3333/v1/api/movieAPI/{id}
 */
movieAPIRoutes.route('/:_id').get(movieController.show).put(movieController.update).delete(movieController.destroy)

export default movieAPIRoutes
