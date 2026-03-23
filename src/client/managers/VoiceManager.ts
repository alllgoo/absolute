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
        // Log the attempt
        Logger.info(`Attempting to join voice channel: ${(channel as any).name}`);
        
        // Use a more generic approach that works with multiple selfbot-v13 versions
        const voice = (this.client as any).voice;
        
        if (voice && typeof voice.joinChannel === 'function') {
          await voice.joinChannel(channel);
        } else if (typeof (channel as any).join === 'function') {
          await (channel as any).join();
        } else if (typeof (channel as any).connect === 'function') {
          await (channel as any).connect();
        } else {
          // Fallback: try to find any join method on the guild's voice manager
          const guild = (channel as any).guild;
          if (guild && guild.voice && typeof guild.voice.setChannel === 'function') {
            await guild.voice.setChannel(channel);
          } else {
            throw new Error('No valid join/connect method found for voice');
          }
        }
        
        Logger.info(`Successfully joined voice channel: ${(channel as any).name}`);
        return true;
      } else {
        Logger.warn(`Channel ${channelId} is not a voice channel`);
        return false;
      }
    } catch (error) {
      // Check if the error is actually a success (sometimes .join() doesn't resolve)
      Logger.error(`Voice join attempt error: ${error}`);
      
      // Verification: Check if we are actually in the channel now
      try {
        const channel = await this.client.channels.fetch(channelId);
        const guild = (channel as any).guild;
        if (guild && guild.me && guild.me.voice && guild.me.voice.channelId === channelId) {
          Logger.info("Verified: Bot is in the channel despite the error.");
          return true;
        }
      } catch (e) {}
      
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
