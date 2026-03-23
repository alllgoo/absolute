import { GhostClient } from '../client/GhostClient';
import { Logger } from '../utils/Logger';

export async function interactionHandler(client: GhostClient) {
  client.on('interactionCreate', (interaction) => {
    Logger.info(`Received interaction: ${interaction.id}`);
  });
}
