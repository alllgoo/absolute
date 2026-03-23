import { Command } from '../../types/command';

const command: Command = {
  name: 'stop',
  description: 'Stops the music and clears the queue',
  category: 'music',
  execute: async (client, message, args) => {
    const player = client.music.manager.get(message.guildId!);
    if (!player) {
      await message.reply('No music is currently playing.');
      return;
    }
    player.destroy();
    await message.reply('Stopped the music and cleared the queue.');
  }
};

export default command;
