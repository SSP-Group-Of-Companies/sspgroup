// src/lib/utils/connectDB.ts
import { MONGO_URI } from "@/config/env";
import mongoose from "mongoose";

let isConnected: boolean = false;
let connectingPromise: Promise<typeof mongoose> | null = null;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  const uri = MONGO_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  if (!connectingPromise) {
    connectingPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
  }

  try {
    await connectingPromise;
    isConnected = true;
  } catch (error) {
    isConnected = false;
    throw error;
  } finally {
    connectingPromise = null;
  }
};

export default connectDB;
