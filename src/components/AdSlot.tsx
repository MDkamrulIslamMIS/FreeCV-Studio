import React, { useEffect, useState, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Execute scripts if raw HTML/scripts are injected by admin
  useEffect(() => {
    if (!adCode || !containerRef.current) return;
    containerRef.current.innerHTML = adCode;

    // Execute any script tags dynamically
    const scripts = containerRef.current.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr: Attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [adCode]);

  // If empty and not in demo mode, completely hide with zero footprint
  if (!adCode && !isDemoMode) {
    return null;
  }

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
          <div
            ref={containerRef}
            className="inline-block min-h-[50px] max-w-full overflow-hidden bg-slate-100/60 rounded-md border border-slate-200/80 p-1"
          />
        ) : (
          <div className="py-4 px-6 bg-slate-100/80 border border-dashed border-slate-300 rounded-lg text-xs text-slate-500 flex flex-col items-center justify-center gap-1">
            <span className="font-semibold text-slate-600">Adsterra Slot: {slot}</span>
            <span className="text-[11px] text-slate-400">
              Clean advertising area configured. Enter your code in Admin Settings or paste into Blogger.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
