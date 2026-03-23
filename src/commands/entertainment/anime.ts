import { Command } from '../../types/command';

const command: Command = {
  name: 'anime',
  description: 'Searches for anime information',
  category: 'entertainment',
  execute: async (client, message, args) => {
    const query = args.join(' ');
    if (!query) {
      await message.reply('Please provide an anime name.');
      return;
    }
    await message.reply(`Searching for anime: ${query}...`);
  }
};

export default command;
