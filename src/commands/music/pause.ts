import { Command } from '../../types/command';

const command: Command = {
  name: 'pause',
  description: 'Pauses the current track',
  category: 'music',
  execute: async (client, message, args) => {
    const player = client.music.manager.get(message.guildId!);
    if (!player) {
      await message.reply('No music is currently playing.');
      return;
    }
    player.pause(true);
    await message.reply('Paused the music.');
  }
};

export default command;
