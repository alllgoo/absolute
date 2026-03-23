import { Schema, model } from 'mongoose';

export interface ISettings {
  key: string;
  value: any;
}

const settingsSchema = new Schema<ISettings>({
  key: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, required: true }
});

export const SettingsModel = model<ISettings>('Settings', settingsSchema);
