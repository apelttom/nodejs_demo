import { type Response } from 'express';
class ControllerUtils {
    constructor() {
        this.defaultHandler = this.defaultHandler.bind(this);
    }

    /**
     * Default response handler pattern.
     * When the promise resulted in a exception, we validate if is a controled
     * exception or a not known exception (returning the right response or passing
     * the threatment to app http 500 default handling).
     * @param {Response} res
     * @param {Promise} promise promise started
     */
    async defaultHandler(
        res: Response,
        promise: Promise<unknown>
    ): Promise<Response<unknown, Record<string, unknown>>> {
        try {
            const data = await promise;
            if (data !== null) return res.status(200).json(data);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                // even better is to create your own errors with your own status codes and translate here
                return res.status(500).json({ error: error.message });
            }
            throw error;
        }
    }
}

export default ControllerUtils;
