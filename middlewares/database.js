import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_UREYE, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})

export async function setUpDb(db) {
  db.collection('tokens').createIndex(
    { expireAt: -1 },
    { expireAfterSeconds: 0 }
  )
  db.collection('scores').createIndex({ createdAt: -1 })
  db.collection('users').createIndex({ email: 1 }, { unique: true })
}

export default async function database(req, res, next) {
  await client.connect()
  req.dbClient = client
  req.db = client.db(process.env.DB_NAME)
  // await setUpDb(req.db)
  return next()
}
