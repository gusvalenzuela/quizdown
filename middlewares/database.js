/* eslint-disable no-underscore-dangle */
import { MongoClient } from 'mongodb'

const { NODE_ENV, MONGODB_UREYE, MONGODB_LOCAL_UREYE, DB_NAME } = process.env
const dev = NODE_ENV === 'development'

const uri = dev ? MONGODB_LOCAL_UREYE : MONGODB_UREYE

let client
let clientPromise

if (dev) {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

export async function setUpDb(db) {
  db.collection('scores').createIndex({ createdAt: -1 })
}

export default async function database(req, _res, next) {
  req.dbClient = client
  req.db = (await clientPromise).db(DB_NAME)
  await setUpDb(req.db)
  return next()
}
