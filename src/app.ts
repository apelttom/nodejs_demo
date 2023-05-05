// initial express app class
import express, { type Express, type Request, type Response, type NextFunction } from 'express'
import 'express-async-errors'

import routes from './routes/App.routes'
import { getLocalConfig } from './configs/app.conf'
// import "./database/Mongo.database"; // database instantiating UNCOMMENT IF YOU WANT TO USE MONGO
// import RedisDatabase from "./database/Redis.database"; // database instantiating UNCOMMENT IF YOU WANT TO USE REDIS

/**
 * Base app - class based.
 */
class App {
  server: Express

  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
    this.exceptionHandler()
    if (getLocalConfig().database === 'redis') {
      this.initializeDatabase()
    }
  }

  initializeDatabase(): void {
    // open Redis connection UNCOMMENT IF YOU WANT TO USE REDIS
    // RedisDatabase.connectToDatabase()
    //   .then(() => {
    //     // other initialization code
    //     // ...
    //   })
    //   .catch((error) => {
    //     console.error("Failed to open Redis connection:", error);
    //     process.exit(1);
    //   });
  }

  /**
   * Application middlewares definition (to every request)
   */
  middlewares(): void {
    this.server.disable('x-powered-by')
    this.server.use(express.json())
  }

  /**
   * Base routes definition
   */
  routes(): void {
    this.server.get('/', (_req: Request, res: Response) => {
      res.send(
        '<!doctype html> <html lang=en> <head> <meta charset=utf-8> <title>blah</title> </head> <body> <p>Node.js starter is running</p> </body> </html>'
      )
    })
    this.server.use('/v1/api', routes)
  }

  /**
   * Default exception handler (that method prevent the app from broke)
   */
  exceptionHandler(): void {
    this.server.use(
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async (err: Error, req: Request, res: Response, _next: NextFunction) => {
        if (getLocalConfig().environment === 'development') {
          const errors = JSON.stringify(err, Object.getOwnPropertyNames(err))
          // const errors = await new Youch(err, req).toJSON();
          return res.status(500).json(errors)
        }
        console.error(err.stack)
        return res.status(500).json({ error: 'Internal server error' })
      }
    )
  }
}

export default new App().server
