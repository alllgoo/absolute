import 'dotenv/config';

const rawOwners = process.env.OWNERS || '';
const parsedOwners = rawOwners.split(',').map(id => id.trim());

export const settings = {
  prefix: process.env.PREFIX || '&',
  owners: parsedOwners,
  mongo_uri: process.env.MONGO_URI || 'mongodb+srv://zonzin736:zin736@diso.wa1fx.mongodb.net/?retryWrites=true&w=majority',
  lavalink: {
    host: process.env.LAVALINK_HOST || 'lavalinkv4.serenetia.com',
    port: parseInt(process.env.LAVALINK_PORT || '443'),
    password: process.env.LAVALINK_PASSWORD || 'https://seretia.link/discord'
  }
};
