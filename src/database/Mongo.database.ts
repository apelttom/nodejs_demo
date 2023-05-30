// This is where you could create connections to your database(s) like Redis, MySQL, MongoDB etc.
import mongoose, { Mongoose } from 'mongoose';

import { getMongoURL } from '../configs/db.mongo.conf';

/**
 * This class is used to make connections to the Mongo DB
 */
class MongoDatabase {
    mongoConnection: Mongoose = new Mongoose();

    async connectToDatabase(): Promise<typeof mongoose> {
        // verify if a connection is already established or if is already connecting
        // by another process
        if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
            // console.log(`[Debugg]: Connecting to a remote DB on ${getMongoURL()}`);
            this.mongoConnection = await mongoose.connect(getMongoURL());
        }
        return this.mongoConnection;
    }

    async disconnectDatabase(): Promise<void> {
        await this.mongoConnection.disconnect();
    }
}

export default new MongoDatabase();
