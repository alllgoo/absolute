import { GhostClient } from '../GhostClient';
import { Logger } from '../../utils/Logger';

export class PresenceManager {
  private client: GhostClient;

  constructor(client: GhostClient) {
    this.client = client;
  }

  public setPresence(status: 'online' | 'idle' | 'dnd' | 'invisible') {
    try {
      this.client.user?.setStatus(status);
      Logger.info(`Presence set to ${status}`);
    } catch (error) {
      Logger.error(`Failed to set presence: ${error}`);
    }
  }

  public setInvisible() {
    this.setPresence('invisible');
  }
}
