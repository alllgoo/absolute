declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      PREFIX: string;
      MONGO_URI: string;
      LAVALINK_HOST: string;
      LAVALINK_PORT: string;
      LAVALINK_PASSWORD: string;
      OWNERS: string;
    }
  }
}

export {};
