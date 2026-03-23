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
