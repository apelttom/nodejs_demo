// This is where you could create connections to your database(s) like Redis, MySQL, MongoDB etc.
import mongoose, { Mongoose } from 'mongoose'

import { getMongoConfig } from '../configs/db.mongo.conf'
import { getLocalConfig } from '../configs/app.conf'

/**
 * This class is used to make connections to the Mongo DB
 */
class MongoDatabase {
  mongoConnection: Mongoose = new Mongoose()

  constructor() {
    void this.mongo()
  }

  async mongo(): Promise<typeof mongoose> {
    // verify if a connection is already established or if is already connecting
    // by another process
    if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
      // console.log(`[Debugg]: Connecting to a remote DB on ${getMongoConfig().mongoURL}`);
      if (getLocalConfig().environment !== 'test') {
        this.mongoConnection = await mongoose.connect(getMongoConfig().mongoURL)
      } else {
        this.mongoConnection = await mongoose.connect(getMongoConfig().mongoURL)
      }
    }

    return this.mongoConnection
  }
}

export default new MongoDatabase()
