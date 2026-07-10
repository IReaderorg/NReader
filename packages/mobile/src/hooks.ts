export function isNative(): boolean {
  return !!(window as any).Capacitor?.isNativePlatform()
}

export async function getNativeStorage(key: string): Promise<string | null> {
  if (!isNative()) return localStorage.getItem(key)
  const { Preferences } = await import('@capacitor/preferences')
  const { value } = await Preferences.get({ key })
  return value
}
