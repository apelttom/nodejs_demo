// initial express app class
import express, { type Express, type Request, type Response, type NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes/App.routes';
import path from 'path';
import MongoDatabase from './database/Mongo.database';
import RedisDatabase from './database/Redis.database';
import assert from 'assert';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import fs from 'fs';

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
        switch (databaseType) {
            case 'MONGO':
                console.log('Initialization of MongoDB connection started...');
                this.initializeMongoDatabase();
                console.log('Complete.');
                break;
            case 'REDIS':
                console.log('Initialization of Redis connection started...');
                this.initializeRedisDatabase();
                console.log('Complete.');
                break;
            case 'RAM':
                // RAM databse needs no initialization
                console.log('Using RAM database.');
                break;
            default:
                console.error('Database environment variable is not properly set. Value: ' + databaseType);
                assert.ok(
                    false,
                    'This should never happen. DB initialization. Default database setup failed. Please contact the developer.'
                );
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
        this.server.get('/', (_req: Request, res: Response) => {
            this.injectDatabaseTypeToIndex();
            res.sendFile(path.join(__dirname, 'index.html'));
        });
        this.server.use('/v1/api', routes);
    }

    injectDatabaseTypeToIndex(): void {
        // Read the file contents
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', function (err, data) {
            if (err != null) {
                throw err;
            }
            const databaseType = process.env.DATABASE_TYPE == null ? 'RAM' : process.env.DATABASE_TYPE;
            // Replace the string
            const updatedData = data.replace(/DATABASE_TYPE/, databaseType);
            // Write the modified contents back to the file
            fs.writeFile(path.join(__dirname, 'index.html'), updatedData, 'utf8', function (err) {
                if (err != null) {
                    throw err;
                }
                // console.log('Database type successfully injected to the index.html');
            });
        });
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
