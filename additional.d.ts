import { NextApiRequest } from 'next'
import type { MongoClient, Db } from 'mongodb'

declare namespace JSX {
  interface IntrinsicElements {
    jsx: boolean
  }
}
export interface CustomNextApiRequest extends NextApiRequest {
  dbClient: MongoClient
  db: Db
}
