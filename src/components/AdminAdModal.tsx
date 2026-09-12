import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { getActiveAdConfig, saveAdConfig, STORAGE_KEY_AD_DEMO } from '../data/adConfig';
import { AdConfig } from '../types';

interface AdminAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAdModal: React.FC<AdminAdModalProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<AdConfig>(getActiveAdConfig());
  const [demoMode, setDemoMode] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(getActiveAdConfig());
      setDemoMode(localStorage.getItem(STORAGE_KEY_AD_DEMO) === 'true');
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (key: keyof AdConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    saveAdConfig(config);
    localStorage.setItem(STORAGE_KEY_AD_DEMO, demoMode ? 'true' : 'false');
    window.dispatchEvent(new Event('freecv_ad_config_updated'));
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-500 text-slate-950 font-extrabold text-[11px] rounded tracking-wider uppercase">
              Admin
            </span>
            <h3 className="text-lg font-bold">ADMIN AD SETTINGS (Adsterra Integration)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5 text-sm">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 space-y-1.5">
            <div className="font-semibold flex items-center gap-1.5 text-blue-800">
              <ShieldCheck className="w-4 h-4" /> Centralized Adsterra / Network Ad Placement System
            </div>
            <p className="text-blue-700 leading-relaxed">
              Paste your Adsterra native banner, display script, or responsive banner tags directly into the corresponding slots below.
              Slots that remain empty are completely collapsed and hidden from visitors. Ads will <strong>never</strong> appear inside the printable CV or cover buttons.
            </p>
          </div>

          {/* Demo toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <div className="font-semibold text-slate-800 text-xs">Preview Ad Slot Outlines</div>
              <div className="text-[11px] text-slate-500">Show visible outlines for all configured ad slots across the builder to verify placements.</div>
            </div>
            <button
              onClick={() => setDemoMode(!demoMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                demoMode
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {demoMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {demoMode ? 'Outlines Active' : 'Hidden When Empty'}
            </button>
          </div>

          {/* Ad Slot Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                1. Header Ad Slot <span className="font-normal text-slate-400">(Top banner below navigation)</span>
              </label>
              <textarea
                value={config.header}
                onChange={(e) => handleChange('header', e.target.value)}
                placeholder="<!-- Paste Adsterra Header Banner Script / HTML tag here -->"
                rows={2}
                className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  2. Category Top Ad <span className="font-normal text-slate-400">(Above categories)</span>
                </label>
                <textarea
                  value={config.categoryTop}
                  onChange={(e) => handleChange('categoryTop', e.target.value)}
                  placeholder="<!-- Category Top Ad -->"
                  rows={2}
                  className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  3. Category Middle Ad <span className="font-normal text-slate-400">(Between categories)</span>
                </label>
                <textarea
                  value={config.categoryMiddle}
                  onChange={(e) => handleChange('categoryMiddle', e.target.value)}
                  placeholder="<!-- Category Middle Ad -->"
                  rows={2}
                  className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                4. Template List Ad <span className="font-normal text-slate-400">(Between template cards row)</span>
              </label>
              <textarea
                value={config.templateList}
                onChange={(e) => handleChange('templateList', e.target.value)}
                placeholder="<!-- Template Grid Native Ad -->"
                rows={2}
                className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  5. Form Top Ad <span className="font-normal text-slate-400">(Above multi-step form)</span>
                </label>
                <textarea
                  value={config.formTop}
                  onChange={(e) => handleChange('formTop', e.target.value)}
                  placeholder="<!-- Form Header Ad -->"
                  rows={2}
                  className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  6. Form Middle Ad <span className="font-normal text-slate-400">(Between form steps)</span>
                </label>
                <textarea
                  value={config.formMiddle}
                  onChange={(e) => handleChange('formMiddle', e.target.value)}
                  placeholder="<!-- Between Steps Ad -->"
                  rows={2}
                  className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  7. Preview Top Ad <span className="font-normal text-slate-400">(Above live CV preview)</span>
                </label>
                <textarea
                  value={config.previewTop}
                  onChange={(e) => handleChange('previewTop', e.target.value)}
                  placeholder="<!-- Preview Top Ad -->"
                  rows={2}
                  className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  8. Download Area Ad <span className="font-normal text-slate-400">(Near Download/Print action)</span>
                </label>
                <textarea
                  value={config.downloadArea}
                  onChange={(e) => handleChange('downloadArea', e.target.value)}
                  placeholder="<!-- Download Area Banner -->"
                  rows={2}
                  className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  9. Footer Ad <span className="font-normal text-slate-400">(Above site footer)</span>
                </label>
                <textarea
                  value={config.footer}
                  onChange={(e) => handleChange('footer', e.target.value)}
                  placeholder="<!-- Footer Ad -->"
                  rows={2}
                  className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  10. Mobile Sticky Ad <span className="font-normal text-slate-400">(Bottom mobile banner)</span>
                </label>
                <textarea
                  value={config.mobileSticky}
                  onChange={(e) => handleChange('mobileSticky', e.target.value)}
                  placeholder="<!-- Mobile Sticky Banner -->"
                  rows={2}
                  className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {savedSuccess ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                ✓ Ad configurations saved successfully!
              </span>
            ) : (
              'Changes take effect instantly across all pages.'
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Ad Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
