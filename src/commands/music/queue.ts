import { Command } from '../../types/command';

const command: Command = {
  name: 'queue',
  description: 'Shows the current music queue',
  category: 'music',
  execute: async (client, message, args) => {
    const player = client.music.manager.get(message.guildId!);
    if (!player) {
      await message.reply('No music is currently playing.');
      return;
    }
    const queue = player.queue.map((track: any, i: number) => `${i + 1}. ${track.title}`).join('\n');
    await message.reply(`Current Queue:\n${queue || 'The queue is empty.'}`);
  }
};

export default command;
