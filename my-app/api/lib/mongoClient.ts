import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || "mongodb+srv://Vercel-Admin-atlas-copper-paddle:rBTxdDOgaDJ2ZP3g@atlas-copper-paddle.ypsabkp.mongodb.net/?retryWrites=true&w=majority";

let client: MongoClient | null = null;

export function getMongoClient(): MongoClient {
  if (!client) {
    client = new MongoClient(uri);
  }
  return client;
}

export default getMongoClient;
