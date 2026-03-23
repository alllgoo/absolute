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
  static generateServerUrl(route: 'join' | 'ping' | 'error' | 'play' | 'uptime' | 'message' | 'embed' | '', params: Record<string, any>) {
    // ⚠️ IMPORTANT: Deployed URL on Vercel
    const baseUrl = 'https://absolute-seven.vercel.app'; 
    
    // Add a cache buster to ensure Discord doesn't cache the embed
    const queryParams: Record<string, string> = {};
    for (const [key, value] of Object.entries(params)) {
      queryParams[key] = String(value);
    }
    queryParams['_cb'] = String(Date.now());
    
    const query = new URLSearchParams(queryParams).toString();
    const fullUrl = `${baseUrl}/${route}${query ? `?${query}` : ''}`;
    return `[⠀](${fullUrl})`;
  }


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
