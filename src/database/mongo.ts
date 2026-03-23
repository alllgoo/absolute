import mongoose from 'mongoose';
import { Logger } from '../utils/Logger';
import { settings } from '../config/settings';

export async function connectDB() {
  try {
    await mongoose.connect(settings.mongo_uri);
    Logger.info('Connected to MongoDB');
  } catch (error) {
    Logger.error(`Failed to connect to MongoDB: ${error}`);
  }
}
