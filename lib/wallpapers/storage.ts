import { getWallpaper, type WallpaperId } from "./presets"

export const WALLPAPER_KEY = "glass-ui:wallpaper"

export function readStoredPreset(storage: Pick<Storage, "getItem"> | null): WallpaperId {
  try { return getWallpaper(storage?.getItem(WALLPAPER_KEY)).id } catch { return getWallpaper(null).id }
}

export function writeStoredPreset(storage: Pick<Storage, "setItem"> | null, id: WallpaperId) {
  try { storage?.setItem(WALLPAPER_KEY, id) } catch { /* private mode or quota: keep the choice for this visit only */ }
}
