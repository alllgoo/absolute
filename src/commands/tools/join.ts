import { Command } from '../../types/command';
import { EmbedBuilder } from '../../utils/EmbedBuilder';

const command: Command = {
  name: 'join',
  description: 'Simulates a user joining a voice channel',
  category: 'tools',
  execute: async (client, message, args) => {
    const voiceChannel = message.member?.voice.channel;
    let vcName = '';
    let vcId = '';


    if (args[0] && !isNaN(Number(args[0]))) {
      vcId = args[0];
      const channel = client.channels.cache.get(vcId);
      if (channel && channel.isVoice()) {
        vcName = channel.name;
      } else {
        vcName = 'Unknown Channel';
      }
    } else if (voiceChannel) {
      vcId = voiceChannel.id;
      vcName = ('name' in voiceChannel ? voiceChannel.name : 'Unknown Channel') || 'Unknown Channel';
    } else {
      const errorUrl = EmbedBuilder.generateServerUrl('error', { msg: "You must be in a voice channel or provide a valid voice channel ID." });
      await message.reply({ content: errorUrl });
      return;
    }

    try {
      await client.voiceManager.joinChannel(vcId);
      const user = message.author.username;
      const ogUrl = EmbedBuilder.generateServerUrl('join', { user, vc: vcName });

      await message.reply({
        content: ogUrl
      });
    } catch (error) {
      console.error('[JOIN ERROR]', error);
      const errorUrl = EmbedBuilder.generateServerUrl('error', { msg: "Failed to join the voice channel." });
      await message.reply({ content: errorUrl });
    }
  }
};

export default command;
