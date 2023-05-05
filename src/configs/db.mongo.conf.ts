// Database-specific configurations like Host, Port & Name.
// NODE_ENV=development
// PORT=3333
// MONGO_HOST=<USE YOUR OWN DATABASE HOSTNAME>
// MONGO_DATABASE=<USE YOUR OWN DATABASE, FOR TEST PURPOSES YOU CAN USE ADMIN OR ANOTHER CREATED BY YOU>
// MONGO_USERNAME=<YOUR DATABASE USERNAME>
// MONGO_PASSWORD=<YOUR DATABASE PASSWORD>
// SRV=<true IF YOU'RE USING ATLAS (onlineDB) OR false IF ITS A LOCAL INSTANCE>

import { type MongoConfig } from './db.mongo.types'

const environment = 'development'
const port = 27017
const host = 'apeltauer-node-db.rgfiddt.mongodb.net'
const database = ''
const username = 'tapeltauerext'
const password = 'DbtE0CkAdnrgiM7x'
const srv = 'true'

export function getMongoConfig(): MongoConfig {
  const credentials = username.length > 0 ? `${username}:${encodeURI(password)}@` : ''
  const base = srv === 'true' ? 'mongodb+srv' : 'mongodb'
  const end = srv === 'true' ? '?retryWrites=true&w=majority' : ''
  const url = `${base}://${credentials}${host}/${database}${end}`

  return {
    mongoURL: url,
    mongoEnvironment: environment,
    mongoPort: port,
    mongoHost: host,
    mongoDatabase: database,
    mongoUsername: username,
    mongoPassword: password,
    srv: false
  }
}
