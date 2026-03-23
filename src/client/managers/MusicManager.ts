import { GhostClient } from '../GhostClient';
import { Logger } from '../../utils/Logger';
import { Manager } from 'erela.js';
import { settings } from '../../config/settings';

export class MusicManager {
  private client: GhostClient;
  public manager: Manager;

  constructor(client: GhostClient) {
    this.client = client;
    this.manager = new Manager({
      nodes: [
        {
          host: settings.lavalink.host,
          port: settings.lavalink.port,
          password: settings.lavalink.password
        }
      ],
      send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
      }
    });

    this.init();
  }

  private init() {
    this.manager.on('nodeConnect', (node) => {
      Logger.info(`Node ${node.options.identifier} connected`);
    });

    this.manager.on('nodeError', (node, error) => {
      Logger.error(`Node ${node.options.identifier} encountered an error: ${error.message}`);
    });

    this.manager.on('trackStart', (player, track) => {
      Logger.info(`Track started: ${track.title}`);
    });
  }

  public async play(guildId: string, voiceChannelId: string, query: string) {
    try {
      const player = this.manager.create({
        guild: guildId,
        voiceChannel: voiceChannelId,
        textChannel: '', // Optional
        selfDeafen: true
      });

      player.connect();

      const res = await this.manager.search(query, this.client.user);
      if (res.loadType === 'LOAD_FAILED') {
        Logger.error('Failed to load track');
        return;
      }

      player.queue.add(res.tracks[0]);
      if (!player.playing && !player.paused && !player.queue.size) {
        player.play();
      }

      Logger.info(`Added track to queue: ${res.tracks[0].title}`);
    } catch (error) {
      Logger.error(`Failed to play music: ${error}`);
    }
  }
}
