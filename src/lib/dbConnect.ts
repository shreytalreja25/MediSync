import mongoose from 'mongoose'

// Hardcoded MongoDB URI for debugging
const MONGODB_URI = 'mongodb+srv://shreytalreja25:Shrey%409999@cluster0.7lbnxum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

console.log('Using MongoDB URI:', MONGODB_URI)

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => mongoose)
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect 