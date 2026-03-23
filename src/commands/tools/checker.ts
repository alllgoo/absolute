import { Command } from '../../types/command';

const command: Command = {
  name: 'checker',
  description: 'A tool for checking something',
  category: 'tools',
  execute: async (client, message, args) => {
    await message.reply('Running check...');
  }
};

export default command;
