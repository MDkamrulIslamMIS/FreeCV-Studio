import { AdConfig } from '../types';

export const STORAGE_KEY_AD_CONFIG = 'freecv_studio_ad_config_v1';
export const STORAGE_KEY_AD_DEMO = 'freecv_studio_ad_demo_mode';

// Centralized Adsterra Configuration
// When blank in production, slots remain completely hidden.
// Admin can paste Adsterra script tags or HTML snippet in Admin Ad Settings.
export const DEFAULT_AD_CONFIG: AdConfig = {
  header: '',
  categoryTop: '',
  categoryMiddle: '',
  templateList: '',
  formTop: '',
  formMiddle: '',
  previewTop: '',
  downloadArea: '',
  footer: '',
  mobileSticky: '',
};

export function getActiveAdConfig(): AdConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_AD_CONFIG);
    if (saved) {
      return { ...DEFAULT_AD_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Error loading ad config', e);
  }
  return DEFAULT_AD_CONFIG;
}

export function saveAdConfig(config: AdConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_AD_CONFIG, JSON.stringify(config));
    window.dispatchEvent(new Event('freecv_ad_config_updated'));
  } catch (e) {
    console.error('Error saving ad config', e);
  }
}
