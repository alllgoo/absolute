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
      
      // Initial message to calculate latency
      const msg = await message.reply('🛰️ **Pinging...**');

      const latency = Date.now() - start;
    const apiLatency = Math.round(client.ws.ping);
    const uptime = client.uptime || 0;

    // Generate dynamic server URL for Discord OG preview
    const ogUrl = EmbedBuilder.generateServerUrl('ping', { 
      latency: latency.toString(), 
      api: apiLatency.toString() 
    });

    const response = 
      `${ogUrl}\n\n` +
      `**☁️ ﾟılı ﾟ.Tokyo aid ϑρ Performance**\n\n` +
      `**☁️ Performance Metrics**\n` +
      `> ⭐️ **Response Speed:** \`${latency}ms\`\n` +
      `> ⭐️ **Discord API:** \`${apiLatency}ms\`\n` +
      `> ⭐️ **Uptime:** \`${formatDuration(uptime)}\`\n\n` +
      `**☁️ ﾟılı ﾟ.Tokyo aid ϑρ Status**\n` +
      '```javascript\n' +
      '// Discord API Status\n' +
      'Status  = "Optimal";\n' +
      `Latency = "${apiLatency}ms";\n\n` +
      '// Bot Performance\n' +
      'Status  = "Needs Attention";\n' +
      `Latency = "${latency}ms";\n` +
      `Uptime  = "${formatDuration(uptime)}";\n` +
      '```\n' +
      `*☁️ ﾟılı ﾟ.Tokyo aid ϑρ is ready to serve*`;

    await msg.edit({
      content: response
    });
  }
};

export default command;
