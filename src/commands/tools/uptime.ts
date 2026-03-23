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
    const ogUrl = EmbedBuilder.generateServerUrl('uptime', { time: uptimeText });

    const response = 
      `${ogUrl}\n` +
      `*☁️ ﾟılı ﾟ.Tokyo aid ϑρ is ready to serve*`;

    await message.reply({
      content: response
    });
  }
};

export default command;
