import { Command } from '../../types/command';

const command: Command = {
  name: 'movies',
  description: 'Searches for movie information',
  category: 'entertainment',
  execute: async (client, message, args) => {
    const query = args.join(' ');
    if (!query) {
      await message.reply('Please provide a movie name.');
      return;
    }
    await message.reply(`Searching for movie: ${query}...`);
  }
};

export default command;
