import { GhostClient } from '../GhostClient';
import { Logger } from '../../utils/Logger';
import { StreamVideo, setFfmpegPath } from '@dank074/discord-video-stream';
import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg';
import play from 'play-dl';

// Set FFmpeg path for the library
setFfmpegPath(ffmpegPath);

export class VoiceManager {
  private client: GhostClient;
  private streamer: any = null;

  constructor(client: GhostClient) {
    this.client = client;
  }

  public async startVideoStream(channelId: string, query: string, guildId: string) {
    try {
      let channel: any = this.client.channels.cache.get(channelId);
      if (!channel) channel = await this.client.channels.fetch(channelId);
      
      if (!channel || !channel.isVoice()) return false;

      // 1. Initialize Streamer if not exists
      if (!this.streamer) {
        this.streamer = new StreamVideo(this.client);
      }

      // 2. Join and Get Voice Connection via the library
      await this.streamer.joinVoice(guildId, channelId);
      Logger.info(`[STREAM] Joined voice channel for streaming: ${channel.name}`);

      // 3. Extract Stream using play-dl
      const streamInfo = await play.stream(query, { quality: 2 }); // High quality
      
      // 4. Start Playing Video
      const udp = await this.streamer.createStream();
      
      // In @dank074 library, we usually play a resource/stream
      // This is a simplified version using the library's capability
      this.streamer.playVideo(streamInfo.url, udp);
      
      Logger.info(`[STREAM] Real video stream started for: ${query}`);
      return true;
    } catch (error) {
      Logger.error(`[STREAM ERROR] ${error}`);
      return false;
    }
  }

  public async joinChannel(channelId: string, isStream: boolean = false) {
    try {
      // Use cache first
      let channel: any = this.client.channels.cache.get(channelId);
      if (!channel) {
        channel = await this.client.channels.fetch(channelId);
      }
      
      if (channel && channel.isVoice()) {
        // Log the attempt
        Logger.info(`Attempting to join voice channel: ${(channel as any).name} (Stream: ${isStream})`);
        
        // Use a more generic approach that works with multiple selfbot-v13 versions
        const voice = (this.client as any).voice;
        let connection: any;
        
        if (voice && typeof voice.joinChannel === 'function') {
          connection = await voice.joinChannel(channel, {
            selfVideo: false, // Disable Camera
            selfMuted: false,
            selfDeaf: true
          });
        } else if (typeof (channel as any).join === 'function') {
          connection = await (channel as any).join({
            selfVideo: false, // Disable Camera
            selfMuted: false,
            selfDeaf: true
          });
        } else if (typeof (channel as any).connect === 'function') {
          connection = await (channel as any).connect({
            selfVideo: false
          });
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
        
        // --- Go Live (Screen Stream) Logic ---
        if (isStream && connection) {
          // In selfbot-v13, "Go Live" is enabled on the connection object
          if (typeof connection.setStream === 'function') {
            await connection.setStream(true);
            Logger.info(`Enabled "Go Live" (Screen Stream) via connection for channel: ${(channel as any).name}`);
          } else if (typeof (channel as any).setStream === 'function') {
            await (channel as any).setStream(true);
            Logger.info(`Enabled "Go Live" (Screen Stream) via channel for channel: ${(channel as any).name}`);
          }
        }
        // ------------------------------

        return true;
      } else {
        Logger.warn(`Channel ${channelId} is not a voice channel`);
        return false;
      }
    } catch (error) {
      // Check if the error is actually a success (sometimes .join() doesn't resolve in selfbots)
      // We don't want to spam the log with timeout errors if we actually joined
      
      // Verification: Check if we are actually in the channel now
      try {
        const guild = (this.client.channels.cache.get(channelId) as any)?.guild;
        if (guild && guild.members.me?.voice?.channelId === channelId) {
          Logger.info("Verified: Bot joined the channel (ignoring connection timeout).");
          return true;
        }
      } catch (e) {}
      
      Logger.error(`Voice join error: ${error}`);
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
