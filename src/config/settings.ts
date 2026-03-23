import 'dotenv/config';

const rawOwners = process.env.OWNERS || '';
const parsedOwners = rawOwners.split(',').map(id => id.trim());

export const settings = {
  prefix: process.env.PREFIX || '&',
  owners: parsedOwners,
  mongo_uri: process.env.MONGO_URI || 'mongodb+srv://zonzin736:zin736@diso.wa1fx.mongodb.net/?retryWrites=true&w=majority',
  lavalink: {
    host: process.env.LAVALINK_HOST || 'lavalink.dark-host.pro',
    port: parseInt(process.env.LAVALINK_PORT || '2333'),
    password: process.env.LAVALINK_PASSWORD || 'youshallnotpass'
  }
};
