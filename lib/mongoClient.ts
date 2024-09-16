import { MongoClient, ServerApiVersion } from 'mongodb';

let client: MongoClient | null = null;

export async function getMongoClient() {
  if (!process.env.MONGO_URI) throw new Error('MONOG_URI is not defined!');

  if (!client) {
    client = new MongoClient(process.env.MONGO_URI, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    await client.connect();
    console.log('MongoDB connected!');
  }

  return client;
}

export async function getDatabase() {
  const client = await getMongoClient();
  return client.db('waba-dev');
}
