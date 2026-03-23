import { GhostClient } from '../client/GhostClient';
import { Logger } from '../utils/Logger';
import { settings } from '../config/settings';

export async function eventHandler(client: GhostClient) {
  client.on('ready', () => {
    Logger.info(`[READY] Logged in as ${client.user?.tag}!`);
    Logger.info(`[READY] Commands Loaded: ${Array.from(client.commands.keys()).join(', ')}`);
  });

  client.on('messageCreate', async (message) => {
    const isOwner = settings.owners.includes(message.author.id);
    const isSelf = message.author.id === client.user?.id;

    if (!isSelf && !isOwner) return;

    const content = message.content.trim();
    if (!content.startsWith(settings.prefix)) return;

    const args = content.slice(settings.prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(client, message, args);
      Logger.info(`[EXEC] ${commandName} for ${message.author.tag}`);
    } catch (error) {
      Logger.error(`[ERROR] ${commandName}: ${error}`);
    }
  });

  client.on('voiceStateUpdate', async (oldState, newState) => {
    // If we are following someone
    if (client.followedUserId && newState.id === client.followedUserId) {
      // If they joined a new channel (or moved to another one)
      if (newState.channelId && oldState.channelId !== newState.channelId) {
        // If we are not already in that channel
        if (newState.guild.me?.voice.channelId !== newState.channelId) {
          Logger.info(`[FOLLOW] Target user ${newState.member?.user.tag} moved to ${newState.channel?.name}. Following...`);
          await client.voiceManager.joinChannel(newState.channelId);
        }
      }
    }
  });
}
