// Usually, you could create a single Route file here to manage all your app related routes
//  but it is recommended to create multiple route files which could be categorised like:
// - Website Routes
// - API Routes
// - Authentication Routes
// - Documentation Routes
import { type Request, type Response, Router } from 'express'
import movieAPIRoutes from './App.MovieAPI.route'

const routes = Router()

/**
 * Simple responser handles everything aimed on base url http://localhost:3333/v1/api/
 * @param {Request} req
 * @param {Response} res
 */
function baseResponser(req: Request, res: Response): void {
  res.status(200).json({ message: 'Welcome to the Node.js Movie Database' })
}

routes.get('/', baseResponser)

/**
 * Movie API routes as defined in App.MovieAPI.route
 */
routes.use('/movieAPI', movieAPIRoutes)

export default routes
