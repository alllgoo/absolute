import { Node } from 'erela.js';
import { GhostClient } from '../client/GhostClient';
import { Logger } from '../utils/Logger';

export async function lavalinkHandler(client: GhostClient) {
  client.music.manager.on('nodeConnect', (node: Node) => {
    Logger.info(`Node ${node.options.identifier} connected`);
  });

  client.music.manager.on('nodeError', (node: Node, error: Error) => {
    Logger.error(`Node ${node.options.identifier} encountered an error: ${error.message}`);
  });
}
