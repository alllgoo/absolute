import { GhostClient } from '../GhostClient';
import { Logger } from '../../utils/Logger';

export class VoiceManager {
  private client: GhostClient;

  constructor(client: GhostClient) {
    this.client = client;
  }

  public async joinChannel(channelId: string) {
    try {
      const channel = await this.client.channels.fetch(channelId);
      if (channel?.isVoice()) {
        // @ts-ignore - discord.js-selfbot-v13 adds .join() to VoiceChannel
        await channel.join();
        Logger.info(`Joined voice channel: ${channel.name}`);
      } else {
        Logger.warn(`Channel ${channelId} is not a voice channel`);
      }
    } catch (error) {
      Logger.error(`Failed to join voice channel: ${error}`);
    }
  }

  public async leaveChannel() {
    try {
      // Access the base client's voice manager to get adapters
      (this.client as any).voice.adapters.forEach((adapter: any) => {
        adapter.destroy();
      });
      Logger.info('Left voice channel');
    } catch (error) {
      Logger.error(`Failed to leave voice channel: ${error}`);
    }
  }
}
