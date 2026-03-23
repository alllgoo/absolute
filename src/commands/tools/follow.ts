import { Command } from '../../types/command';
import { EmbedBuilder } from '../../utils/EmbedBuilder';

const command: Command = {
  name: 'follow',
  description: 'Follows a user into voice channels',
  category: 'tools',
  execute: async (client, message, args) => {
    const subCommand = args[0]?.toLowerCase();

    // 1. follow off
    if (subCommand === 'off') {
      if (!client.followedUserId) {
        const url = EmbedBuilder.generateServerUrl('error', { 
          msg: "I am not following anyone right now." 
        });
        await message.reply({ content: url });
        return;
      }

      client.followedUserId = null;
      const url = EmbedBuilder.generateServerUrl('embed', { 
        title: "Follow System",
        desc: "Follow mode has been turned **OFF**. I will no longer follow anyone." 
      });
      await message.reply({ content: url });
      return;
    }

    // 2. follow <userId>
    const targetId = args[0];
    if (!targetId) {
      const url = EmbedBuilder.generateServerUrl('error', { 
        msg: "Please provide a User ID to follow, or use `follow off` to stop." 
      });
      await message.reply({ content: url });
      return;
    }

    try {
      const targetUser = await client.users.fetch(targetId);
      if (!targetUser) {
        const url = EmbedBuilder.generateServerUrl('error', { 
          msg: "Invalid User ID: Unable to find this user." 
        });
        await message.reply({ content: url });
        return;
      }

      client.followedUserId = targetId;
      
      const url = EmbedBuilder.generateServerUrl('embed', { 
        title: "Follow System",
        desc: `Now following user: **${targetUser.username}** (${targetId}). I will follow them into any voice channel they join.` 
      });
      await message.reply({ content: url });

      // Check if they are already in a voice channel
      // We check all guilds the client is in
      for (const guild of client.guilds.cache.values()) {
        const member = guild.members.cache.get(targetId);
        if (member && member.voice.channelId) {
          await client.voiceManager.joinChannel(member.voice.channelId);
          break;
        }
      }

    } catch (e) {
      const url = EmbedBuilder.generateServerUrl('error', { 
        msg: "An error occurred while trying to follow this user. Make sure the ID is correct." 
      });
      await message.reply({ content: url });
    }
  }
};

export default command;
