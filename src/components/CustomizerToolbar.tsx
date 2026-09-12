import React from 'react';
import { Palette, Type, Sliders, Image, Sparkles, LayoutList, RefreshCw } from 'lucide-react';
import { StyleCustomization, CVTemplate } from '../types';

interface CustomizerToolbarProps {
  customization: StyleCustomization;
  onUpdate: (updated: Partial<StyleCustomization>) => void;
  currentTemplate: CVTemplate;
  onOpenTemplateSelector: () => void;
  onOpenSectionManager: () => void;
}

export const COLOR_PRESETS = [
  { name: 'Navy', primary: '#1e3a8a', accent: '#3b82f6' },
  { name: 'Dark Blue', primary: '#0369a1', accent: '#0284c7' },
  { name: 'Black', primary: '#111827', accent: '#374151' },
  { name: 'Gray', primary: '#334155', accent: '#64748b' },
  { name: 'Green', primary: '#047857', accent: '#10b981' },
  { name: 'Burgundy', primary: '#881337', accent: '#be123c' },
  { name: 'Brown', primary: '#451a03', accent: '#b45309' },
  { name: 'Teal', primary: '#0f766e', accent: '#14b8a6' },
];

export const FONT_PRESETS = [
  { name: 'Modern (Plus Jakarta Sans)', value: 'Plus Jakarta Sans' },
  { name: 'Clean (Outfit)', value: 'Outfit' },
  { name: 'Neutral (Inter)', value: 'Inter' },
  { name: 'Classic Serif (EB Garamond)', value: 'EB Garamond' },
  { name: 'Executive (Playfair Display)', value: 'Playfair Display' },
  { name: 'Editorial (Lora)', value: 'Lora' },
  { name: 'Academic (Merriweather)', value: 'Merriweather' },
  { name: 'Technical (JetBrains Mono)', value: 'JetBrains Mono' },
];

export const CustomizerToolbar: React.FC<CustomizerToolbarProps> = ({
  customization,
  onUpdate,
  currentTemplate,
  onOpenTemplateSelector,
  onOpenSectionManager,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs p-4 print:hidden space-y-4">
      {/* Top row: active template badge + quick action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Design:</span>
          <button
            onClick={onOpenTemplateSelector}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-800 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors border border-blue-200"
            title="Click to switch among 400 professional templates"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>{currentTemplate.name}</span>
            <span className="text-[10px] bg-blue-200/80 px-1.5 py-0.5 rounded text-blue-900 font-semibold uppercase">
              {currentTemplate.style}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTemplateSelector}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Change Template
          </button>
          <button
            onClick={onOpenSectionManager}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-800 text-white hover:bg-slate-900 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <LayoutList className="w-3.5 h-3.5" /> Reorder Sections
          </button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Color presets */}
        <div>
          <label className="block font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-slate-500" /> Color Preset
          </label>
          <div className="flex items-center gap-1.5 flex-wrap">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => onUpdate({ primaryColor: preset.primary, accentColor: preset.accent })}
                className={`w-6 h-6 rounded-full transition-transform border-2 ${
                  customization.primaryColor === preset.primary
                    ? 'scale-115 border-slate-900 shadow-md ring-2 ring-blue-400'
                    : 'border-white hover:scale-105'
                }`}
                style={{ backgroundColor: preset.primary }}
                title={preset.name}
              />
            ))}
            <input
              type="color"
              value={customization.primaryColor}
              onChange={(e) => onUpdate({ primaryColor: e.target.value })}
              className="w-6 h-6 rounded-full cursor-pointer border border-slate-300 p-0 overflow-hidden"
              title="Custom Color"
            />
          </div>
        </div>

        {/* Font family */}
        <div>
          <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-slate-500" /> Font Typography
          </label>
          <select
            value={customization.fontFamily}
            onChange={(e) => onUpdate({ fontFamily: e.target.value })}
            className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          >
            {FONT_PRESETS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font & Section Spacing */}
        <div>
          <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-slate-500" /> Sizing & Density
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-slate-500 block mb-0.5">Text Size:</span>
              <div className="flex bg-slate-100 rounded-md p-0.5">
                {(['small', 'medium', 'large'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => onUpdate({ fontSize: s })}
                    className={`flex-1 py-1 text-[11px] rounded transition-all capitalize ${
                      customization.fontSize === s ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    {s[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block mb-0.5">Spacing:</span>
              <div className="flex bg-slate-100 rounded-md p-0.5">
                {(['compact', 'standard', 'generous'] as const).map((sp) => (
                  <button
                    key={sp}
                    onClick={() => onUpdate({ sectionSpacing: sp })}
                    className={`flex-1 py-1 text-[11px] rounded transition-all capitalize ${
                      customization.sectionSpacing === sp ? 'bg-white font-bold text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    {sp[0].toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div>
          <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-slate-500" /> Display Toggles
          </label>
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <button
              onClick={() => onUpdate({ showPhoto: !customization.showPhoto })}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-colors text-xs border ${
                customization.showPhoto
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              Photo: {customization.showPhoto ? 'ON' : 'OFF'}
            </button>

            <button
              onClick={() => onUpdate({ showIcons: !customization.showIcons })}
              className={`px-2.5 py-1.5 rounded-lg font-semibold transition-colors text-xs border ${
                customization.showIcons
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              Icons: {customization.showIcons ? 'ON' : 'OFF'}
            </button>

            {currentTemplate.sidebarPosition !== 'none' && (
              <button
                onClick={() => onUpdate({ showSidebar: !customization.showSidebar })}
                className={`px-2.5 py-1.5 rounded-lg font-semibold transition-colors text-xs border ${
                  customization.showSidebar
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}
              >
                Sidebar: {customization.showSidebar ? 'ON' : 'OFF'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
