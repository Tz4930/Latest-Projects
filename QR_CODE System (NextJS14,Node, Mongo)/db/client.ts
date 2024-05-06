// utils/mongodb.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (typeof MONGODB_URI !== 'string') {
    throw new Error('MONGODB_URI is not defined. Please define the MONGODB_URI environment variable.');
}

interface CachedConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

const cached: CachedConnection = {
    conn: null,
    promise: null,
};

async function dbConnect(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: mongoose.ConnectOptions = {
            bufferCommands: false,
        };

        // Assert MONGODB_URI as string using the non-null assertion operator (!)
        // This tells TypeScript that you're sure MONGODB_URI is not null or undefined.
        cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}


export default dbConnect;
