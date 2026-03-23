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

    const response = 
      `${ogUrl}\n\n` +
      `**☁️ ﾟılı ﾟ.Tokyo aid ϑρ Voice System**\n\n` +
      `> 👤 **User:** \`${user}\`\n` +
      `> 🔊 **Channel:** \`${vc}\`\n\n` +
      `*☁️ ﾟılı ﾟ.Tokyo aid ϑρ is ready to serve*`;

    await message.reply({
      content: response
    });
  }
};

export default command;
