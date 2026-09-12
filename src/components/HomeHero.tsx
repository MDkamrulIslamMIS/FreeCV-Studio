import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Download,
  Smartphone,
  CheckCircle,
  Eye,
  Lock,
  Palette,
  ArrowRight,
  Layers,
  Award,
} from 'lucide-react';
import { AdSlot } from './AdSlot';

interface HomeHeroProps {
  onCreateCVNow: () => void;
  onExploreCategories: () => void;
  onBrowseTemplates: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  onCreateCVNow,
  onExploreCategories,
  onBrowseTemplates,
}) => {
  const benefits = [
    {
      icon: Zap,
      title: '100% Free Forever',
      desc: 'No hidden paywalls, subscription traps, or credit card requirements.',
    },
    {
      icon: Lock,
      title: 'No Login or Registration',
      desc: 'Start building instantly. Zero personal account sign-up needed.',
    },
    {
      icon: Layers,
      title: '20 Categories & 400 Templates',
      desc: 'Tailored for merchandisers, engineers, executives, students, and more.',
    },
    {
      icon: Download,
      title: 'Instant High-Res PDF & Print',
      desc: 'One-click A4 standard PDF export formatted to international standards.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-Friendly Builder',
      desc: 'Craft, edit, and download your resume smoothly on phone, tablet, or desktop.',
    },
    {
      icon: ShieldCheck,
      title: 'ATS-Friendly Formats',
      desc: 'Tested to parse accurately in Taleo, Workday, Greenhouse, and Lever.',
    },
    {
      icon: Eye,
      title: 'Privacy-First Architecture',
      desc: 'Your data stays in your browser. We never harvest or sell your personal details.',
    },
    {
      icon: Palette,
      title: 'Custom Styles & Colors',
      desc: 'Easily adjust fonts, spacing, color presets, and section arrangements.',
    },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      {/* Hero Header Area */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-3xl text-white p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden border border-slate-800">
        {/* Decorative background glow */}
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free • No Sign-Up • Instant PDF
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
            Free Online CV & <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              Resume Builder
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            Create a job-winning CV in minutes with 400 professional templates across 20 industries. Completely free, no registration required, and recruiter-approved worldwide.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              id="hero-create-cv-btn"
              onClick={onCreateCVNow}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all"
            >
              <Sparkles className="w-4 h-4" /> Create My CV Now
            </button>

            <button
              id="hero-explore-categories-btn"
              onClick={onExploreCategories}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-sm rounded-xl backdrop-blur-xs border border-white/20 flex items-center gap-2 transition-all"
            >
              Explore 20 Categories <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-browse-templates-btn"
              onClick={onBrowseTemplates}
              className="px-5 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 flex items-center gap-2 transition-all"
            >
              Browse 400 Templates
            </button>
          </div>

          {/* Trust badges */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Free Forever
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> A4 International Standard
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Zero Account Required
            </span>
          </div>
        </div>
      </div>

      {/* Ad slot under hero */}
      <AdSlot slot="headerBanner" />

      {/* 8 Key Benefits Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Why Professionals Choose FreeCV Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Built from the ground up to eliminate paywalls, aggressive logins, and cumbersome formatting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, index) => {
            const Icon = b.icon;
            return (
              <div
                key={index}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 space-y-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
