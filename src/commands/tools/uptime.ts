import { Command } from '../../types/command';
import { formatDuration } from '../../utils/formatters';
import { EmbedBuilder } from '../../utils/EmbedBuilder';

const command: Command = {
  name: 'uptime',
  description: 'Shows how long the bot has been online',
  category: 'tools',
  execute: async (client, message, args) => {
    const uptime = client.uptime || 0;
    const uptimeText = formatDuration(uptime);
    
    // Generate dynamic server URL for Discord OG preview
    const ogUrl = EmbedBuilder.generateServerUrl('uptime', { 
      time: uptimeText,
      image: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
    });

    await message.reply({
      content: ogUrl
    });
  }
};

export default command;
