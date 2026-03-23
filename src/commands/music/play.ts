import { Command } from '../../types/command';
import { EmbedBuilder } from '../../utils/EmbedBuilder';

const command: Command = {
  name: 'play',
  description: 'Plays music from YouTube',
  category: 'music',
  execute: async (client, message, args) => {
    const query = args.join(' ');
    if (!query) {
      await message.reply('Please provide a search query.');
      return;
    }

    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) {
      await message.reply('You must be in a voice channel to play music.');
      return;
    }

    await client.music.play(message.guildId!, voiceChannel.id, query);
    
    const channelName = ('name' in voiceChannel ? voiceChannel.name : 'Unknown Channel') || 'Unknown Channel';
    
    // Generate dynamic server URL for Discord OG preview
    const ogUrl = EmbedBuilder.generateServerUrl('play', { 
      song: query, 
      user: message.author.username 
    });

    const response = 
      `${ogUrl}\n\n` +
      `**☁️ ﾟılı ﾟ.Tokyo aid ϑρ Music**\n\n` +
      `> 🎶 **Now Playing:** \`${query}\`\n` +
      `> 📻 **Channel:** \`${channelName}\`\n\n` +
      `*☁️ ﾟılı ﾟ.Tokyo aid ϑρ is ready to serve*`;

    await message.reply({
      content: response
    });
  }
};

export default command;
