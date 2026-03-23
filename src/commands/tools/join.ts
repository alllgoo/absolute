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


    if (args[0]) {
      vcId = args[0];
      try {
        let fetchedChannel: any = client.channels.cache.get(vcId);
        if (!fetchedChannel) {
          fetchedChannel = await client.channels.fetch(vcId);
        }
        
        if (!fetchedChannel) {
          const errorUrl = EmbedBuilder.generateServerUrl('embed', { 
            title: "Voice Error",
            desc: "Invalid Channel ID: The channel does not exist."
          });
          await message.reply({ content: errorUrl });
          return;
        }
        if (!fetchedChannel.isVoice()) {
          const errorUrl = EmbedBuilder.generateServerUrl('embed', { 
            title: "Voice Error",
            desc: "Invalid Channel: The provided ID is not a voice channel."
          });
          await message.reply({ content: errorUrl });
          return;
        }
        vcName = (fetchedChannel as any).name;
      } catch (e) {
        const errorUrl = EmbedBuilder.generateServerUrl('embed', { 
          title: "Voice Error",
          desc: "Invalid Channel ID: Unable to fetch channel."
        });
        await message.reply({ content: errorUrl });
        return;
      }
    } else if (voiceChannel) {
      vcId = voiceChannel.id;
      vcName = ('name' in voiceChannel ? voiceChannel.name : 'Unknown Channel') || 'Unknown Channel';
    } else {
      const errorUrl = EmbedBuilder.generateServerUrl('embed', { 
        title: "Voice Error",
        desc: "You must be in a voice channel or provide a channel ID."
      });
      await message.reply({ content: errorUrl });
      return;
    }


  
    const currentVoice = message.guild?.members.me?.voice.channelId;
    if (currentVoice === vcId) {
      const errorUrl = EmbedBuilder.generateServerUrl('embed', { 
        title: "Voice Status",
        desc: `I am already in the voice channel: **${vcName}**`
      });
      await message.reply({ content: errorUrl });
      return;
    }


    const targetChannel = await client.channels.fetch(vcId);
    if (targetChannel && 'permissionsFor' in targetChannel) {
      const permissions = (targetChannel as any).permissionsFor(client.user?.id);
      if (permissions && !permissions.has('CONNECT')) {
        const errorUrl = EmbedBuilder.generateServerUrl('embed', { 
          title: "Permission Error",
          desc: `I don't have permission to connect to ${vcName}.` 
        });
        await message.reply({ content: errorUrl });
        return;
      }
      if (permissions && !permissions.has('SPEAK')) {
        console.warn('Bot does not have SPEAK permission');
      }
    }

    // 4. Try to Join (Don't await, reply first to be faster)
    client.voiceManager.joinChannel(vcId).catch(e => console.error(`[JOIN BACKGROUND ERROR] ${e}`));

    const userName = message.author.username;
    const ogUrl = EmbedBuilder.generateServerUrl('embed', { 
      title: "Voice System",
      desc: `__${userName}__ has joined **${vcName}**` 
    });
    await message.reply({ content: ogUrl });
  }
};

export default command;
