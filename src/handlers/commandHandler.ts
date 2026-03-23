import { GhostClient } from '../client/GhostClient';
import { Logger } from '../utils/Logger';
import fs from 'fs';
import path from 'path';

export async function commandHandler(client: GhostClient) {
  const commandsPath = path.join(__dirname, '../commands');
  const categories = fs.readdirSync(commandsPath);
  
  for (const category of categories) {
    const categoryPath = path.join(commandsPath, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;
    
    const files = fs.readdirSync(categoryPath);
    for (const file of files) {
      if (file.endsWith('.ts')) {
        try {
          const command = await import(`../commands/${category}/${file}`);
          const cmd = command.default || command;
          if (cmd && cmd.name) {
            client.commands.set(cmd.name, cmd);
            Logger.info(`Loaded command: ${cmd.name}`);
          }
        } catch (error) {
          Logger.error(`Failed to load command ${file}: ${error}`);
        }
      }
    }
  }
}
