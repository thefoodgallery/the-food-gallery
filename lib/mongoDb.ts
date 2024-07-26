import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = {
  conn: null as typeof import("mongoose") | null,
  promise: null as Promise<typeof import("mongoose")> | null,
};

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    if (MONGODB_URI) {
      cached.promise = mongoose.connect(MONGODB_URI, opts);
    } else {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env"
      );
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
