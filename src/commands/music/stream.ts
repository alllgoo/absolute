import { Command } from '../../types/command';
import { EmbedBuilder } from '../../utils/EmbedBuilder';

const command: Command = {
  name: 'stream',
  description: 'Plays a video stream from YouTube in voice channel',
  category: 'music',
  execute: async (client, message, args) => {
    const query = args.join(' ');
    if (!query) {
      const errorUrl = EmbedBuilder.generateServerUrl('embed', { 
        title: "Stream Error",
        desc: "Please provide a **YouTube Link** or search query." 
      });
      await message.reply({ content: errorUrl });
      return;
    }

    const voiceChannel = message.member?.voice.channel;
    if (!voiceChannel) {
      const errorUrl = EmbedBuilder.generateServerUrl('embed', { 
        title: "Stream Error",
        desc: "You must be in a **voice channel** to stream video." 
      });
      await message.reply({ content: errorUrl });
      return;
    }

    try {
      const channelName = ('name' in voiceChannel ? voiceChannel.name : 'Unknown Channel') || 'Unknown Channel';
      const ogUrl = EmbedBuilder.generateServerUrl('embed', { 
        title: "Stream System",
        desc: `🎬 __Streaming__: **${query}**\n📍 __Channel__: **${channelName}**\n👤 __By__: **${message.author.username}**`,
        image: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
      });
      await message.reply({ content: ogUrl });

      // 2. Execute the heavy logic in background
      // Use the new video stream logic with guildId
      client.voiceManager.startVideoStream(voiceChannel.id, query, message.guildId!).catch(e => {
        console.error('[STREAM BACKGROUND ERROR]', e);
      });

    } catch (error) {
      console.error('[STREAM ERROR]', error);
      const errorUrl = EmbedBuilder.generateServerUrl('embed', { 
        title: "Stream Error",
        desc: "Failed to start the stream. Make sure the link is valid." 
      });
      await message.reply({ content: errorUrl });
    }
  }
};

export default command;
