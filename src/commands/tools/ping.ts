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
      `__**☁️ Performance Metrics**__\n` +
      `> ⭐️ **Response Speed:** \`${latency}ms\`\n` +
      `> ⭐️ **Discord API:** \`${apiLatency}ms\`\n` +
      `> ⭐️ **Uptime:** \`${formatDuration(uptime)}\`\n\n` +
      `__**☁️ ﾟılı ﾟ.Tokyo aid ϑρ Status**__\n` +
      '```javascript\n' +
      '// Discord API Status\n' +
      'Status  = "Optimal";\n' +
      `Latency = "${apiLatency}ms";\n\n` +
      '// Bot Performance\n' +
      'Status  = "Needs Attention";\n' +
      `Latency = "${latency}ms";\n` +
      `Uptime  = "${formatDuration(uptime)}";\n` +
      '```';

    // Generate dynamic server URL for Discord OG preview using the generic embed route
    const ogUrl = EmbedBuilder.generateServerUrl('embed', { 
      title: '☁️ ﾟılı ﾟ.Tokyo aid ϑρ Performance',
      desc: description
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
