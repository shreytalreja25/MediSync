import { MongoClient, ServerApiVersion, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
if (!uri) throw new Error('Please define the MONGODB_URI environment variable');

let cachedClient: MongoClient | null = (global as any)._mongoClient || null;
let cachedDb: Db | null = (global as any)._mongoDb || null;

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb && cachedClient) {
    return cachedDb;
  }
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    tlsAllowInvalidCertificates: true,
  });
  await client.connect();
  await client.db().admin().command({ ping: 1 });
  console.log('Connected to MongoDB with official driver');
  cachedClient = client;
  cachedDb = client.db();
  (global as any)._mongoClient = cachedClient;
  (global as any)._mongoDb = cachedDb;
  return cachedDb;
}

export async function closeDatabase() {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    (global as any)._mongoClient = null;
    (global as any)._mongoDb = null;
    console.log('Closed MongoDB connection');
  }
} 