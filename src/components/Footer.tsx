import React, { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Heart,
  HelpCircle,
  Code,
  Code2,
  Lock,
  Terminal,
  Mail,
  Phone,
  MessageCircle,
  Github,
  Linkedin,
  Globe,
  Check,
  Copy,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { KAMRUL_PHOTO } from '../data/kamrulPhoto';

interface FooterProps {
  onNavigate?: (view: 'home' | 'categories' | 'templates' | 'builder') => void;
  onOpenBloggerGuide?: () => void;
  onOpenAdminAd?: () => void;
  onOpenFAQ?: () => void;
  onOpenStaticPage?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate = (_view?: any) => {},
  onOpenBloggerGuide = () => {},
  onOpenAdminAd = () => {},
  onOpenFAQ = () => {},
  onOpenStaticPage = (_page?: string) => {},
}) => {
  const [copiedType, setCopiedType] = useState<'phone' | 'email' | null>(null);

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 pb-10 border-t border-slate-800/80 print:hidden text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ========================================================================= */}
        {/* DEVELOPER / CODER SPOTLIGHT CARD                                         */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
          {/* Top Terminal Bar */}
          <div className="px-5 py-3 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-1.5 ml-2 font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span>coder@freecv-studio: ~/creator/md-kamrul-islam.ts</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Software & Web Projects
              </span>
            </div>
          </div>

          {/* Developer Details & Contact Content */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Coder Avatar & Badges */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center text-center sm:text-left lg:text-center gap-4">
              <div className="relative group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-blue-500/40 p-1 bg-slate-800/80 shadow-lg shadow-blue-500/10">
                  <img
                    src={KAMRUL_PHOTO}
                    alt="Md. Kamrul Islam - Creator & Coder"
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                  <Code2 className="w-3 h-3" /> Coder
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-center sm:justify-start lg:justify-center gap-1.5">
                  <span>Md. Kamrul Islam</span>
                  <span className="text-blue-400 text-xs">✓</span>
                </h3>
                <p className="text-xs font-semibold text-blue-400 font-mono">
                  Full-Stack Web Developer & Coder
                </p>
                <p className="text-[11px] text-slate-400">
                  Founder & Educator • <a href="https://alltechacademybd.blogspot.com/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white underline">All Tech Academy BD</a>
                </p>
              </div>
            </div>

            {/* Coder Bio & Tech Stack */}
            <div className="lg:col-span-5 space-y-4 text-xs text-slate-300">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-blue-400 font-bold uppercase tracking-wider text-[11px] font-mono">
                  <Sparkles className="w-3.5 h-3.5" /> About The Architect
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Hi, I'm <strong className="text-white">Md. Kamrul Islam</strong>, the programmer behind FreeCV Studio. I develop modern, accessible web applications, responsive software systems, and educational tech resources to empower professionals globally.
                </p>
              </div>

              {/* Technologies Coded With */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 font-mono">Core Tech Stack:</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {['PHP & Laravel', 'JavaScript (ES6+)', 'React & TypeScript', 'MySQL', 'Tailwind CSS', 'REST APIs', 'Git'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-800 text-slate-200 rounded-md border border-slate-700/60 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="lg:col-span-3 flex flex-col gap-2.5">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider font-mono">
                Connect Directly:
              </span>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/8801810811417"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-medium text-xs flex items-center justify-between shadow-md shadow-emerald-600/20 transition-all"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 fill-white/20" /> WhatsApp Chat
                </span>
                <span className="font-mono text-[11px] text-emerald-100">01810811417</span>
              </a>

              {/* Email Direct Button */}
              <a
                href="mailto:mdkamrulislamnakir@gmail.com"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs flex items-center justify-between border border-slate-700 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" /> Send Email
                </span>
                <span className="font-mono text-[10px] text-slate-400 truncate max-w-[120px]">
                  mdkamrulislamnakir
                </span>
              </a>

              {/* Phone Call / Direct Copy */}
              <div className="flex items-center gap-2">
                <a
                  href="tel:01810811417"
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-200 text-xs flex items-center justify-center gap-1.5 border border-slate-700/60 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call 01810811417
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy('01810811417', 'phone')}
                  title="Copy Phone/WhatsApp Number"
                  className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors flex items-center justify-center"
                >
                  {copiedType === 'phone' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Social Channels: GitHub, LinkedIn, Blog */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href="https://github.com/MDkamrulIslamMIS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 flex items-center justify-center gap-1.5 text-[11px] transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5 text-slate-300" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/md-kamrul-islam1997"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 flex items-center justify-center gap-1.5 text-[11px] transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" /> LinkedIn
                </a>
                <a
                  href="https://alltechacademybd.blogspot.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-800 flex items-center justify-center gap-1.5 text-[11px] transition-colors"
                  title="Tech Blog"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" /> Blog
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN 4-COLUMN FOOTER LINKS                                                */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Col 1: Brand & Security */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                FreeCV <span className="text-blue-400">Studio</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              100% Free online CV & Resume Builder with 400 professional templates. Engineered for job seekers across the globe without registration or hidden costs.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-2 rounded-lg">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Client-side data security: your data stays in your browser.</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  20 Job Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('templates')} className="hover:text-white transition-colors">
                  Browse 400 Templates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('builder')} className="hover:text-white transition-colors">
                  CV Builder & Live Preview
                </button>
              </li>
              <li>
                <button onClick={onOpenFAQ} className="hover:text-white transition-colors flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Popular Industries</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  IT & Software Developers (20 Templates)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Merchandiser & Apparel Sourcing (20 Templates)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Fresh Graduate & Student (40 Templates)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Accounting & Financial Analysis (40 Templates)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  Management & Leadership (20 Templates)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Coder Contact & Blogger Integration */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Contact & Blogger Setup</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://wa.me/8801810811417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp: 01810811417
                </a>
              </li>
              <li>
                <a
                  href="mailto:mdkamrulislamnakir@gmail.com"
                  className="hover:text-white flex items-center gap-1.5 transition-colors truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" /> mdkamrulislamnakir@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://alltechacademybd.blogspot.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" /> alltechacademybd.blogspot.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="flex items-center gap-1.5 flex-wrap">
            <span>© {new Date().getFullYear()} FreeCV Studio.</span>
            <span>Created & Coded by</span>
            <strong className="text-slate-300 font-medium">Md. Kamrul Islam</strong>
            <span>• All Tech Academy BD</span>
            <button
              onClick={onOpenAdminAd}
              className="text-slate-600 hover:text-amber-400 transition-colors ml-1.5 inline-flex items-center gap-1"
              title="Owner PIN Protected Login"
            >
              <Lock className="w-2.5 h-2.5" />
            </button>
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <span>100% Free Forever</span>
            <span>•</span>
            <span>A4 Document Standards</span>
            <span>•</span>
            <span>Zero Data Stored</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
