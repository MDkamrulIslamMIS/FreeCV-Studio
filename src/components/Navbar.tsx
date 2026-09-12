import React from 'react';
import { FileText, Sparkles, BookOpen, Layers, Settings, HelpCircle, Download, Code } from 'lucide-react';

interface NavbarProps {
  activeView?: 'home' | 'categories' | 'templates' | 'builder';
  currentView?: 'home' | 'categories' | 'templates' | 'builder';
  onNavigate: (view: 'home' | 'categories' | 'templates' | 'builder') => void;
  onOpenAdminAd?: () => void;
  onOpenAdminAds?: () => void;
  onOpenBloggerGuide: () => void;
  onOpenClearConfirm?: () => void;
  onDownloadPdf?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  currentView,
  onNavigate,
  onOpenAdminAd,
  onOpenAdminAds,
  onOpenBloggerGuide,
  onOpenClearConfirm,
  onDownloadPdf,
}) => {
  const current = activeView || currentView || 'home';
  const handleOpenAdmin = onOpenAdminAd || onOpenAdminAds || (() => {});
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            id="brand-logo-button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <FileText className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  FreeCV <span className="text-blue-600">Studio</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full">
                  100% Free
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
                Create a Professional CV for Free
              </span>
            </div>
          </div>

          {/* Center Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <button
              id="nav-home-btn"
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg transition-colors ${
                current === 'home'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            <button
              id="nav-categories-btn"
              onClick={() => onNavigate('categories')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                current === 'categories'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              Categories <span className="text-xs px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full">20</span>
            </button>
            <button
              id="nav-templates-btn"
              onClick={() => onNavigate('templates')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                current === 'templates'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Templates <span className="text-xs px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded-full font-semibold">400</span>
            </button>
            <button
              id="nav-builder-btn"
              onClick={() => onNavigate('builder')}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                current === 'builder'
                  ? 'text-blue-600 bg-blue-50/80 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              CV Editor
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {current === 'builder' ? (
              <>
                <button
                  id="nav-clear-cv-btn"
                  onClick={onOpenClearConfirm}
                  className="px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
                  title="Clear all CV data"
                >
                  Clear CV
                </button>
                <button
                  id="nav-download-pdf-btn"
                  onClick={onDownloadPdf}
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </button>
              </>
            ) : (
              <button
                id="nav-create-cv-btn"
                onClick={() => onNavigate('builder')}
                className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Create CV Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation */}
      <div className="md:hidden flex items-center justify-around bg-slate-50 border-t border-slate-200 px-2 py-1 text-xs">
        <button
          onClick={() => onNavigate('home')}
          className={`py-1.5 px-2.5 rounded ${activeView === 'home' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate('categories')}
          className={`py-1.5 px-2.5 rounded ${activeView === 'categories' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
        >
          Categories (20)
        </button>
        <button
          onClick={() => onNavigate('templates')}
          className={`py-1.5 px-2.5 rounded ${activeView === 'templates' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
        >
          Templates (400)
        </button>
        <button
          onClick={() => onNavigate('builder')}
          className={`py-1.5 px-2.5 rounded ${activeView === 'builder' ? 'text-blue-600 font-bold' : 'text-slate-600'}`}
        >
          CV Editor
        </button>
        <button
          onClick={onOpenBloggerGuide}
          className="py-1.5 px-2.5 rounded text-amber-700 font-medium"
        >
          Blogger
        </button>
      </div>
    </header>
  );
};
