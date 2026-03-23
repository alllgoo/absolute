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
        // In selfbot-v13, we can use the join method on the voice channel
        // or the connect method on the guild's voice manager.
        // Let's use the channel.join() which is standard for selfbots.
        await (channel as any).join({
          selfVideo: false,
          selfMute: false,
          selfDeaf: false
        });
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
