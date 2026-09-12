import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Eye, EyeOff, ShieldCheck, Lock, KeyRound, Code, Copy, Check, ExternalLink } from 'lucide-react';
import { getActiveAdConfig, saveAdConfig, STORAGE_KEY_AD_DEMO } from '../data/adConfig';
import { AdConfig } from '../types';

interface AdminAdModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OWNER_PINS = ['1417', '01810811417', 'kamrul', '1234'];
const SESSION_AUTH_KEY = 'freecv_admin_authed';

export const AdminAdModal: React.FC<AdminAdModalProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<AdConfig>(getActiveAdConfig());
  const [demoMode, setDemoMode] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'ads' | 'blogger' | 'code'>('ads');

  // PIN security
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
  });
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [copiedBlogger, setCopiedBlogger] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setConfig(getActiveAdConfig());
      setDemoMode(localStorage.getItem(STORAGE_KEY_AD_DEMO) === 'true');
      setSavedSuccess(false);
      setPinError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.trim().toLowerCase();
    if (OWNER_PINS.includes(cleanPin)) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      setPinError('');
    } else {
      setPinError('Incorrect PIN! Only the owner (Md. Kamrul Islam) can access.');
    }
  };

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

  const bloggerEmbedCode = `<!-- FreeCV Studio - Responsive Full-Width Blogger Integration -->
<style>
  .post-body, .entry-content, .main-inner { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
  #freecv-container { width: 100%; min-height: 100vh; border: none; overflow: hidden; }
  #freecv-frame { width: 100%; height: 100vh; min-height: 920px; border: 0; display: block; }
</style>
<div id="freecv-container">
  <iframe id="freecv-frame" src="${window.location.origin}" allow="clipboard-write; camera" title="FreeCV Studio Online Resume Builder"></iframe>
</div>`;

  const handleCopyBloggerCode = () => {
    navigator.clipboard.writeText(bloggerEmbedCode);
    setCopiedBlogger(true);
    setTimeout(() => setCopiedBlogger(false), 2500);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-slate-700 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Owner Private Control Center</h3>
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono text-[10px] rounded uppercase font-bold">
                  Owner Only
                </span>
              </div>
              <p className="text-xs text-slate-400">Md. Kamrul Islam • Adsterra & Blogger Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECURITY PIN GATE */}
        {!isAuthenticated ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto border-2 border-amber-200">
              <KeyRound className="w-8 h-8" />
            </div>
            <div className="space-y-2 max-w-md mx-auto">
              <h4 className="text-lg font-bold text-slate-900">Protected Security Gate</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                এই কন্ট্রোল প্যানেলটি সাধারণ কোনো ভিজিটর খুলতে পারবে না। সাইটের মালিক হিসেবে আপনার সিক্রেট পিন নম্বরটি দিন:
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="max-w-xs mx-auto space-y-4">
              <div>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Secret PIN (e.g. 1417)"
                  autoFocus
                  className="w-full px-4 py-2.5 text-center text-lg tracking-widest font-mono bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white"
                />
                {pinError && (
                  <p className="text-xs font-semibold text-rose-600 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {pinError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Unlock Admin Panel
              </button>
              <p className="text-[11px] text-slate-400">
                Default Owner PIN: <span className="font-mono font-bold text-slate-600">1417</span> (last 4 digits of 01810811417)
              </p>
            </form>
          </div>
        ) : (
          <div>
            {/* Nav Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
              <button
                onClick={() => setActiveTab('ads')}
                className={`pb-3 px-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'ads'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Adsterra Codes Manager
              </button>
              <button
                onClick={() => setActiveTab('blogger')}
                className={`pb-3 px-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'blogger'
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code className="w-4 h-4" /> Blogger Embed Guide
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`pb-3 px-3 text-xs font-bold transition-colors border-b-2 flex items-center gap-1.5 ${
                  activeTab === 'code'
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Copy className="w-4 h-4" /> Permanent Code Export
              </button>
            </div>

            {/* TAB 1: ADSTERRA ADS */}
            {activeTab === 'ads' && (
              <div className="p-6 max-h-[65vh] overflow-y-auto space-y-5 text-sm">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <ShieldCheck className="w-4 h-4 text-amber-600" /> Private Ad Placements (Only You Control This)
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    এখানে আপনার Adsterra-এর কোডগুলো পেস্ট করে "Save Changes" দিন। সাধারণ ভিজিটররা কখনোই এই অপশনটি দেখতে বা এডিট করতে পারবে না!
                  </p>
                </div>

                {/* Demo toggle */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">Preview Ad Outlines</div>
                    <div className="text-[11px] text-slate-500">Show visible outlines on page to test placements</div>
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
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      1. Top Header Banner (728x90 desktop / 320x50 mobile)
                    </label>
                    <textarea
                      value={config.header}
                      onChange={(e) => handleChange('header', e.target.value)}
                      placeholder="<!-- Paste Adsterra Header Banner Script here -->"
                      rows={3}
                      className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      2. Download Area High-CPM Ad (300x250 Rectangle) - Recommended!
                    </label>
                    <textarea
                      value={config.downloadArea}
                      onChange={(e) => handleChange('downloadArea', e.target.value)}
                      placeholder="<!-- Paste Adsterra 300x250 Banner Script here -->"
                      rows={3}
                      className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      3. Mobile Sticky Bottom Ad (320x50)
                    </label>
                    <textarea
                      value={config.mobileSticky}
                      onChange={(e) => handleChange('mobileSticky', e.target.value)}
                      placeholder="<!-- Paste Adsterra 320x50 Script here -->"
                      rows={2}
                      className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">
                      4. Footer Banner Ad (728x90)
                    </label>
                    <textarea
                      value={config.footer}
                      onChange={(e) => handleChange('footer', e.target.value)}
                      placeholder="<!-- Paste Footer Banner Script here -->"
                      rows={2}
                      className="w-full font-mono text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: BLOGGER EMBED */}
            {activeTab === 'blogger' && (
              <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4 text-xs">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 space-y-1">
                  <p className="font-bold">Blogger Embed Instructions:</p>
                  <p>1. Go to Blogger.com &gt; Pages &gt; New Page</p>
                  <p>2. Switch to <strong>HTML View</strong></p>
                  <p>3. Paste the code below and click Publish!</p>
                </div>

                <div className="relative">
                  <pre className="p-3 bg-slate-900 text-amber-300 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed max-h-64">
                    {bloggerEmbedCode}
                  </pre>
                  <button
                    onClick={handleCopyBloggerCode}
                    className="absolute top-2 right-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center gap-1.5 shadow"
                  >
                    {copiedBlogger ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedBlogger ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: CODE EXPORT */}
            {activeTab === 'code' && (
              <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                  <p className="font-bold mb-1">Permanent Integration:</p>
                  <p>
                    আপনি চাইলে নিচের JSON কোডটি কপি করে আমাকে চ্যাটে পাঠিয়ে দিতে পারেন। আমি সরাসরি ওয়েবসাইটের কোডের ভেতর এটি পার্মানেন্টলি সেভ করে দেব, যাতে ব্রাউজার ক্যাশ ক্লিয়ার হলেও কোনোদিন ডিলিট না হয়!
                  </p>
                </div>

                <div className="relative">
                  <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed max-h-64">
                    {JSON.stringify(config, null, 2)}
                  </pre>
                  <button
                    onClick={handleCopyJson}
                    className="absolute top-2 right-2 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg flex items-center gap-1.5 shadow"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedJson ? 'Copied!' : 'Copy JSON'}
                  </button>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close
              </button>

              <div className="flex items-center gap-3">
                {savedSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                    <Check className="w-4 h-4" /> Saved & Activated!
                  </span>
                )}
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
