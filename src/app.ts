// initial express app class
import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes/App.routes';
import MongoDatabase from './database/Mongo.database';
import RedisDatabase from './database/Redis.database';
import assert from 'assert';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import expressActuator from 'express-actuator';

/**
 * Base app - class based.
 */
class App {
    server: Express;

    constructor() {
        dotenv.config();
        this.server = express();
        this.middlewares();
        this.routes();
        this.exceptionHandler();
        const databaseType = process.env.DATABASE_TYPE == null ? 'RAM' : process.env.DATABASE_TYPE;
        if (databaseType == null) {
            console.error('Database environment variable is not properly set.');
            assert.ok(
                false,
                'This should never happen. DB initialization. Default database setup failed. Please contact the developer.'
            );
        }
        if (databaseType === 'MONGO') {
            console.log('Initialization of Mongo DB...');
            this.initializeMongoDatabase();
            console.log('DB initialization complete.');
        }
        if (databaseType === 'REDIS') {
            console.log('Initialization of Redis DB...');
            this.initializeRedisDatabase();
            console.log('DB initialization complete.');
        }
        if (databaseType === 'RAM') {
            console.log('Using RAM database');
        }
    }

    initializeMongoDatabase(): void {
        // Here we initialize Mongo DB
        MongoDatabase.connectToDatabase()
            .then(() => {
                // other initialization code
                // ...
            })
            .catch((error) => {
                console.error('Failed to open MongoDB connection:', error);
                process.exit(1);
            });
    }

    initializeRedisDatabase(): void {
        RedisDatabase.connectToDatabase()
            .then(() => {
                // other initialization code
                // ...
            })
            .catch((error) => {
                console.error('Failed to open Redis connection:', error);
                process.exit(1);
            });
    }

    /**
     * Application middlewares definition (to every request)
     */
    middlewares(): void {
        this.server.disable('x-powered-by');
        this.server.use(express.json());
        this.server.use(expressActuator());
        // disable CORS for development if you wish
        // this.server.use(function (req, res, next) {
        //   res.header('Access-Control-Allow-Origin', '*')
        //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        //   next()
        // })
    }

    /**
     * Base routes definition
     */
    routes(): void {
        this.server.use('/v1/api', routes);
    }

    /**
     * Default exception handler (that method prevent the app from broke)
     */
    exceptionHandler(): void {
        this.server.use(
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            async (err: Error, req: Request, res: Response, _next: NextFunction) => {
                const environment = process.env.NODE_ENV == null ? 'development' : process.env.NODE_ENV;
                if (environment === 'development') {
                    const errors = JSON.stringify(err, Object.getOwnPropertyNames(err));
                    // const errors = await new Youch(err, req).toJSON();
                    return res.status(500).json(errors);
                }
                console.error(err.stack);
                return res.status(500).json({ error: 'Internal server error' });
            }
        );
    }
}

export default new App().server;
