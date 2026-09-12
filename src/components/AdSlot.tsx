import React, { useEffect, useState } from 'react';
import { getActiveAdConfig, STORAGE_KEY_AD_DEMO } from '../data/adConfig';
import { AdConfig } from '../types';

interface AdSlotProps {
  slot: keyof AdConfig;
  className?: string;
  label?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ slot, className = '', label = 'Advertisement' }) => {
  const [adCode, setAdCode] = useState<string>('');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  const loadAd = () => {
    const config = getActiveAdConfig();
    const code = config[slot]?.trim() || '';
    setAdCode(code);
    const demo = localStorage.getItem(STORAGE_KEY_AD_DEMO) === 'true';
    setIsDemoMode(demo);
  };

  useEffect(() => {
    loadAd();
    const handleUpdate = () => loadAd();
    window.addEventListener('freecv_ad_config_updated', handleUpdate);
    return () => window.removeEventListener('freecv_ad_config_updated', handleUpdate);
  }, [slot]);

  // If empty and not in demo mode, completely hide with zero footprint
  if (!adCode && !isDemoMode) {
    return null;
  }

  const isScriptBased = adCode.includes('<script') || adCode.includes('invoke.js') || adCode.includes('atOptions');
  const slotHeight =
    slot === 'header' || slot === 'footer'
      ? 100
      : slot === 'mobileSticky'
      ? 60
      : slot === 'downloadArea'
      ? 260
      : 120;

  return (
    <div
      id={`ad-slot-${slot}`}
      className={`print:hidden my-4 text-center overflow-hidden transition-all duration-300 ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-[10px] tracking-wider uppercase text-slate-400 font-medium mb-1">
          {label}
        </div>
        {adCode ? (
          <div className="inline-block w-full max-w-full overflow-hidden bg-slate-50 rounded-lg border border-slate-200/80 p-1">
            {isScriptBased ? (
              <iframe
                title={`ad-${slot}`}
                srcDoc={`<!DOCTYPE html><html><head><base target="_blank"><style>html,body{margin:0;padding:0;display:flex;justify-content:center;align-items:center;background:transparent;overflow:hidden;}</style></head><body>${adCode}</body></html>`}
                className="border-0 overflow-hidden mx-auto block"
                style={{ width: '100%', minHeight: `${slotHeight}px`, maxWidth: '728px' }}
                scrolling="no"
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
              />
            ) : (
              <div
                dangerouslySetInnerHTML={{ __html: adCode }}
                className="flex justify-center items-center"
              />
            )}
          </div>
        ) : (
          <div className="py-4 px-6 bg-slate-100/80 border border-dashed border-slate-300 rounded-lg text-xs text-slate-500 flex flex-col items-center justify-center gap-1">
            <span className="font-semibold text-slate-600">Adsterra Slot: {slot}</span>
            <span className="text-[11px] text-slate-400">
              Clean advertising area configured. Click "Ad Settings" in the navbar or footer to paste your Adsterra code.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
