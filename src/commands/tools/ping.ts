import { Command } from '../../types/command';
import { formatDuration } from '../../utils/formatters';
import { EmbedBuilder } from '../../utils/EmbedBuilder';

const command: Command = {
  name: 'ping',
  description: 'Replies with Pong!',
  category: 'tools',

  execute: async (client, message, args) => {
    try {
      const start = Date.now();

      const msg = await message.reply('🛰️ **Pinging...**');

      const latency = Date.now() - start;
    const apiLatency = Math.round(client.ws.ping);
    const uptime = client.uptime || 0;

    const description = 
      `Performance Metrics\n` +
      `Response Speed: \`${latency}ms\`\n` +
      `Discord API: \`${apiLatency}ms\`\n` +
      `Uptime: \`${formatDuration(uptime)}\`\n`;

    const ogUrl = EmbedBuilder.generateServerUrl('embed', { 
      title: 'Ghosty Performance',
      desc: description,
      image: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
    });

    await msg.edit({
      content: ogUrl
    });
    } catch (error) {
      console.error('[PING ERROR]', error);
      await message.reply('An error occurred while running the ping command.');
    }
  }
};

export default command;
