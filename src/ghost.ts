import 'dotenv/config';
import { GhostClient } from './client/GhostClient';
import { connectDB } from './database/mongo';
import { Logger } from './utils/Logger';

async function start() {
  Logger.info('Starting Ghost Selfbot...');
  await connectDB();

  // Initialize Client
  const client = new GhostClient({
  });

  // Start Client
  const token = process.env.TOKEN;
  if (!token) {
    Logger.error('TOKEN is not provided in .env file');
    process.exit(1);
  }

  // Prevent multiple local instances if running in terminal
  console.clear();
  Logger.info(`[SYSTEM] Starting Client Instance...`);
  Logger.info(`[SYSTEM] If you see double replies, please check if another terminal or process is running the bot.`);

  await client.start(token);
}

start().catch((error) => {
  Logger.error('An unexpected error occurred: ' + error);
});
