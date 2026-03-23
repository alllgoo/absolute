import { Command } from '../../types/command';
import { EmbedBuilder } from '../../utils/EmbedBuilder';

const command: Command = {
  name: 'embed',
  description: 'Embeds any text with a link',
  category: 'tools',
  execute: async (client, message, args) => {
    const text = args.join(' ');
    if (!text) {
      await message.reply('Please provide some text to embed.');
      return;
    }

    // Generate dynamic server URL for Discord OG preview
    const ogUrl = EmbedBuilder.generateServerUrl('message', { text });

    const response = 
      `${ogUrl}\n\n` +
      `**☁️ ﾟılı ﾟ.Tokyo aid ϑρ User Message**\n\n` +
      `> ${text}\n\n` +
      `*☁️ ﾟılı ﾟ.Tokyo aid ϑρ is ready to serve*`;

    await message.reply({
      content: response
    });
  }
};

export default command;
