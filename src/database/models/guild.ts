import { Schema, model } from 'mongoose';

export interface IGuild {
  guildId: string;
  prefix: string;
}

const guildSchema = new Schema<IGuild>({
  guildId: { type: String, required: true, unique: true },
  prefix: { type: String, default: '!' }
});

export const GuildModel = model<IGuild>('Guild', guildSchema);
