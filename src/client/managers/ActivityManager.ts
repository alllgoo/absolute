import { GhostClient } from '../GhostClient';
import { Logger } from '../../utils/Logger';

export class ActivityManager {
  private client: GhostClient;

  constructor(client: GhostClient) {
    this.client = client;
  }

  public setActivity(name: string, type: 'PLAYING' | 'STREAMING' | 'LISTENING' | 'WATCHING' | 'COMPETING' = 'PLAYING') {
    try {
      this.client.user?.setActivity(name, { type });
      Logger.info(`Activity set to ${type}: ${name}`);
    } catch (error) {
      Logger.error(`Failed to set activity: ${error}`);
    }
  }

  public clearActivity() {
    this.client.user?.setActivity('');
    Logger.info('Activity cleared');
  }
}
