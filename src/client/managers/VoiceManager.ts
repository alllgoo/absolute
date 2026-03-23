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
      if (channel && channel.isVoice()) {
        // Use the built-in joinChannel method if available, or try channel.join()
        // For discord.js-selfbot-v13, it's often channel.join()
        // but sometimes it's handled by the client's voice manager
        if ((this.client as any).voice && typeof (this.client as any).voice.joinChannel === 'function') {
          await (this.client as any).voice.joinChannel(channel);
        } else if (typeof (channel as any).join === 'function') {
          await (channel as any).join();
        } else if (typeof (channel as any).connect === 'function') {
          await (channel as any).connect();
        } else {
          throw new Error('No join or connect method found on channel');
        }
        
        Logger.info(`Joined voice channel: ${(channel as any).name}`);
        return true;
      } else {
        Logger.warn(`Channel ${channelId} is not a voice channel`);
        return false;
      }
    } catch (error) {
      Logger.error(`Failed to join voice channel: ${error}`);
      return false;
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
