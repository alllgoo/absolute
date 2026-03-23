import { Message } from 'discord.js-selfbot-v13';
import { GhostClient } from '../client/GhostClient';

export interface Command {
  name: string;
  description: string;
  category: string;
  execute: (client: GhostClient, message: Message, args: string[]) => Promise<void>;
}
