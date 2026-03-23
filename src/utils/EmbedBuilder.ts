import { MessageEmbed } from 'discord.js-selfbot-v13';

export class EmbedBuilder extends MessageEmbed {
  constructor() {
    super();
    this.setColor('#2b2d31');
  }

  /**
   * Generates a dynamic server URL that Discord's crawler can fetch for OG tags.
   * Note: You must deploy the server.ts and replace the baseUrl with your actual domain.
   */
  static generateServerUrl(route: 'join' | 'ping' | 'error' | 'play' | 'uptime' | 'message' | '', params: Record<string, any>) {
    // ⚠️ IMPORTANT: Replace this with your actual deployed URL (e.g., https://tokyo-aid-og.vercel.app)
    const baseUrl = 'https://REPLACE-WITH-YOUR-VERCEL-URL.vercel.app'; 
    
    // Add a cache buster to ensure Discord doesn't cache the embed
    const queryParams = { ...params, _cb: Date.now() };
    const query = new URLSearchParams(queryParams as Record<string, string>).toString();
    
    return `${baseUrl}/${route}${query ? `?${query}` : ''}`;
  }

  /**
   * Classic Embed style for fallback or other uses.
   */
  static tokyo(title: string, description: string) {
    return new EmbedBuilder()
      .setTitle(title)
      .setURL('https://zeldris44.vercel.app/')
      .setDescription(description)
      .setColor('#2b2d31')
      .setAuthor('ℤ𝖊𝖑𝖉𝖗𝖎𝖘', 'https://zeldris44.vercel.app/favicon.ico', 'https://zeldris44.vercel.app/')
      .setFooter('☁️ ﾟılı ﾟ.Tokyo aid ϑρ is ready to serve', 'https://zeldris44.vercel.app/favicon.ico')
      .setTimestamp();
  }
}
