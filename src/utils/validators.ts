export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isSnowflake(id: string): boolean {
  return /^\d{17,19}$/.test(id);
}
