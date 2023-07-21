// Usually, you could create a single Route file here to manage all your app related routes
//  but it is recommended to create multiple route files which could be categorised like:
// - Website Routes
// - API Routes
// - Authentication Routes
// - Documentation Routes
import { type Request, type Response, Router } from 'express';
import Prometheus from 'prom-client';
import path from 'path';
import fs from 'fs';

import movieAPIRoutes from './App.MovieAPI.route';

const routes = Router();
// Prometheus metrics registration and start
const register = new Prometheus.Registry();
register.setDefaultLabels({
    app: 'app_nodejs_demo'
});
Prometheus.collectDefaultMetrics({ register });

/**
 * Simple responser handles everything aimed on base url http://localhost:3333/v1/api/
 * @param {Request} req
 * @param {Response} res
 */
// function baseResponser(req: Request, res: Response): void {
//     res.status(200).json({ message: 'Welcome to the Node.js Movie Database' });
// }

// routes.get('/', baseResponser);

/**
 * Dirty Front End for Development purposes http://localhost:3333/v1/api/
 * @param {Request} req
 * @param {Response} res
 */
routes.get('/', (_req: Request, res: Response) => {
    injectDatabaseTypeToIndex();
    res.sendFile(path.normalize(path.resolve(__dirname) + '/../index.html'));
});

function injectDatabaseTypeToIndex(): void {
    // Read the file contents
    fs.readFile(path.normalize(path.resolve(__dirname) + '/../index.html'), 'utf8', function (err, data) {
        if (err != null) {
            throw err;
        }
        const databaseType = process.env.DATABASE_TYPE == null ? 'RAM' : process.env.DATABASE_TYPE;
        // Replace the string
        const updatedData = data.replace(/DATABASE_TYPE/g, databaseType);

        // Write the modified contents back to the file
        fs.writeFile(path.normalize(path.resolve(__dirname) + '/../index.html'), updatedData, 'utf8', function (err) {
            if (err != null) {
                throw err;
            }
            // console.log('Database type successfully injected to the index.html');
        });
    });
}

/**
 * Metrics for Prometheus software on url http://localhost:3333/v1/api/prometheus
 * @param {Request} req
 * @param {Response} res
 */
routes.get('/prometheus', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', register.contentType);
    void register.metrics().then((data) => res.status(200).send(data));
});

/**
 * Movie API routes as defined in App.MovieAPI.route
 */
routes.use('/movieAPI', movieAPIRoutes);

export default routes;
