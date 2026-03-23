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

    // 1. Get Channel Info
    if (args[0]) {
      vcId = args[0];
      try {
        const fetchedChannel = await client.channels.fetch(vcId);
        if (!fetchedChannel) {
          const errorUrl = EmbedBuilder.generateServerUrl('error', { 
            msg: "Invalid Channel ID: The channel does not exist.",
            image: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
          });
          await message.reply({ content: errorUrl });
          return;
        }
        if (!fetchedChannel.isVoice()) {
          const errorUrl = EmbedBuilder.generateServerUrl('error', { 
            msg: "Invalid Channel: The provided ID is not a voice channel.",
            image: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
          });
          await message.reply({ content: errorUrl });
          return;
        }
        vcName = (fetchedChannel as any).name;
      } catch (e) {
        const errorUrl = EmbedBuilder.generateServerUrl('error', { 
          msg: "Invalid Channel ID: Unable to fetch channel.",
          image: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
        });
        await message.reply({ content: errorUrl });
        return;
      }
    } else if (voiceChannel) {
      vcId = voiceChannel.id;
      vcName = ('name' in voiceChannel ? voiceChannel.name : 'Unknown Channel') || 'Unknown Channel';
    } else {
      const errorUrl = EmbedBuilder.generateServerUrl('error', { 
        msg: "You must be in a voice channel or provide a valid voice channel ID.",
        image: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
      });
      await message.reply({ content: errorUrl });
      return;
    }

    // 2. Check if already in THAT voice channel
    const currentVoice = message.guild?.me?.voice.channelId;
    if (currentVoice === vcId) {
      const errorUrl = EmbedBuilder.generateServerUrl('error', { 
        msg: `I am already in the voice channel: <#${vcId}>`,
        image: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
      });
      await message.reply({ content: errorUrl });
      return;
    }

    // 3. Check Permissions
    const targetChannel = await client.channels.fetch(vcId);
    if (targetChannel && 'permissionsFor' in targetChannel) {
      const permissions = (targetChannel as any).permissionsFor(client.user?.id);
      if (permissions && !permissions.has('CONNECT')) {
        const errorUrl = EmbedBuilder.generateServerUrl('error', { 
          msg: `I don't have permission to connect to <#${vcId}>.`,
          image: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
        });
        await message.reply({ content: errorUrl });
        return;
      }
      if (permissions && !permissions.has('SPEAK')) {
        // Optional warning but still can join
        console.warn('Bot does not have SPEAK permission');
      }
    }

    // 4. Try to Join
    const success = await client.voiceManager.joinChannel(vcId);
    if (success) {
      const userMention = `<@${message.author.id}>`;
      const avatar = message.author.displayAvatarURL({ dynamic: true, format: 'png' });
      const ogUrl = EmbedBuilder.generateServerUrl('join', { user: userMention, vc: `<#${vcId}>`, image: avatar });
      await message.reply({ content: ogUrl });
    } else {
      const errorUrl = EmbedBuilder.generateServerUrl('error', { 
        msg: `Failed to join the voice channel <#${vcId}>. It might be full or private.`,
        image: message.author.displayAvatarURL({ dynamic: true, format: 'png' })
      });
      await message.reply({ content: errorUrl });
    }
  }
};

export default command;
