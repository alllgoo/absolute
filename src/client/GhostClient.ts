import { Client, ClientOptions, Collection } from 'discord.js-selfbot-v13';
import { Logger } from '../utils/Logger';
import { ActivityManager } from './managers/ActivityManager';
import { PresenceManager } from './managers/PresenceManager';
import { VoiceManager } from './managers/VoiceManager';
import { MusicManager } from './managers/MusicManager';
import { commandHandler } from '../handlers/commandHandler';
import { eventHandler } from '../handlers/eventHandler';
import { settings } from '../config/settings';

export class GhostClient extends Client {
  public commands: Collection<string, any> = new Collection();
  public activity: ActivityManager;
  public customPresence: PresenceManager;
  public voiceManager: VoiceManager;
  public music: MusicManager;
  public followedUserId: string | null = null;

  constructor(options: ClientOptions) {
    super(options);
    Logger.info(`[CLIENT] Initializing new GhostClient instance...`);
    this.activity = new ActivityManager(this);
    this.customPresence = new PresenceManager(this);
    this.voiceManager = new VoiceManager(this);
    this.music = new MusicManager(this);
  }

  public async start(token: string) {
    try {
      await this.initHandlers();
      await this.login(token);
      Logger.info('Client logged in successfully.');
    } catch (error) {
      Logger.error('Failed to start client: ' + error);
      process.exit(1);
    }
  }

  private async initHandlers() {
    await commandHandler(this);
    await eventHandler(this);
  }
}
