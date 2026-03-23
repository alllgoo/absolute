import { Command } from '../../types/command';

const command: Command = {
  name: 'skip',
  description: 'Skips the current track',
  category: 'music',
  execute: async (client, message, args) => {
    const player = client.music.manager.get(message.guildId!);
    if (!player) {
      await message.reply('No music is currently playing.');
      return;
    }
    player.stop();
    await message.reply('Skipped the track.');
  }
};

export default command;
