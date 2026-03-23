import { Command } from '../../types/command';
import { EmbedBuilder } from '../../utils/EmbedBuilder';

const command: Command = {
  name: 'join',
  description: 'Simulates a user joining a voice channel',
  category: 'tools',
  execute: async (client, message, args) => {
    const user = args[0] || message.author.username;
    const vc = args.slice(1).join(' ') || 'General';

    // Generate dynamic server URL for Discord OG preview
    const ogUrl = EmbedBuilder.generateServerUrl('join', { user, vc });

    await message.reply({
      content: ogUrl
    });
  }
};

export default command;
