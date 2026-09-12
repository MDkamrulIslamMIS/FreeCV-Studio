import React from 'react';
import { X, Shield, FileText, Info, HelpCircle, BookOpen, Mail, AlertCircle, Cookie, MessageCircle, Phone, Globe, Github, Linkedin, Code2 } from 'lucide-react';
import { KAMRUL_PHOTO } from '../data/kamrulPhoto';

interface StaticPageModalProps {
  pageId: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookies' | 'guide' | 'faq' | null;
  onClose: () => void;
  onOpenFAQ?: () => void;
}

export const StaticPageModal: React.FC<StaticPageModalProps> = ({ pageId, onClose }) => {
  if (!pageId) return null;

  const contentMap: Record<string, { title: string; icon: any; body: React.ReactNode }> = {
    about: {
      title: 'About FreeCV Studio',
      icon: Info,
      body: (
        <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
          <p>
            <strong>FreeCV Studio</strong> is an open, international career enablement platform created with a singular mission: to provide every job seeker on Earth with free, uncompromising access to world-class resume and CV creation tools.
          </p>
          <p>
            Unlike traditional resume builders that trick users into entering their career history only to demand credit cards or monthly subscriptions at the download screen, FreeCV Studio is completely free forever. There are no paywalls, no trial expirations, and no forced user registration.
          </p>
          <h4 className="font-bold text-slate-900 text-sm pt-2">Our Core Principles</h4>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Zero Cost:</strong> Complete access to all 400 templates and unlimited PDF downloads.</li>
            <li><strong>Recruiter Precision:</strong> Industry-specific customization across 20 distinct professional domains.</li>
            <li><strong>Total Privacy:</strong> Zero server-side caching or sale of personal resume data.</li>
            <li><strong>Global Standards:</strong> Built to satisfy ATS algorithms and human hiring managers across North America, Europe, Asia, the Middle East, and beyond.</li>
          </ul>

          <div className="mt-4 p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={KAMRUL_PHOTO}
                alt="Md. Kamrul Islam"
                className="w-12 h-12 rounded-xl object-cover border border-blue-500/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-bold text-sm text-white">Created & Engineered by Md. Kamrul Islam</div>
                <div className="text-xs text-blue-400 font-mono">Full-Stack Web Developer & Tech Educator</div>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Founder of <strong>All Tech Academy BD</strong>. Dedicated to engineering accessible software systems, empowering developers, and providing modern digital tools for professionals worldwide.
            </p>
          </div>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      body: (
        <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
          <p><em>Last Updated: September 2025</em></p>
          <p>
            At FreeCV Studio, we take your privacy with the utmost seriousness. Because your resume contains sensitive personal contact information, employment history, and academic credentials, our application architecture was intentionally designed to operate client-side in your browser.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">1. Data Storage & Transmission</h4>
          <p>
            We do <strong>not</strong> transmit or store your filled CV details on our remote database servers. When you type into the builder or upload a profile photo, data is processed locally inside your browser memory and optional local storage. If you clear your browser history or click "Clear CV", the data is immediately eradicated.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">2. Third-Party Advertising</h4>
          <p>
            To keep this service 100% free for all users worldwide without charging subscriptions, we host third-party advertising partners (such as Adsterra). These partners may use anonymous cookies to deliver contextual advertisements.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">3. Analytics & Logging</h4>
          <p>
            We collect anonymous aggregate metrics (e.g. page visits, browser types) to ensure cross-device stability. No personally identifiable CV content is ever logged.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms of Use',
      icon: FileText,
      body: (
        <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
          <p>
            Welcome to FreeCV Studio. By accessing or using our CV Builder website, you agree to comply with and be bound by the following Terms of Use.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">Permitted Usage</h4>
          <p>
            You are granted a non-exclusive, worldwide, royalty-free license to generate, modify, download, and distribute personal curriculum vitae documents created with our software for legitimate employment and academic application purposes.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">Intellectual Property</h4>
          <p>
            The software interface, template typography architectures, styling frameworks, and website designs remain the intellectual property of FreeCV Studio. You retain complete, unrestricted ownership of all personal text and information you input into your documents.
          </p>
        </div>
      ),
    },
    disclaimer: {
      title: 'Disclaimer',
      icon: AlertCircle,
      body: (
        <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
          <p>
            FreeCV Studio provides resume layouts, design suggestions, and pre-formatted industry fields as an informational utility.
          </p>
          <p>
            While our templates are engineered to align with contemporary Applicant Tracking System (ATS) guidelines and corporate hiring best practices, we cannot guarantee specific interview invitations, job placement, or employment outcomes. The accuracy of career statements, factual dates, credentials, and achievements remains the sole responsibility of the applicant.
          </p>
        </div>
      ),
    },
    cookies: {
      title: 'Cookie Policy',
      icon: Cookie,
      body: (
        <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
          <p>
            FreeCV Studio utilizes minimal browser storage mechanisms (including cookies and <code className="bg-slate-100 px-1 py-0.5 rounded">localStorage</code>) to enhance your workflow.
          </p>
          <h4 className="font-bold text-slate-900 text-sm">How We Use Cookies:</h4>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Draft Preservation:</strong> Retaining your CV inputs so you don't lose progress if you accidentally refresh the tab.</li>
            <li><strong>Template Favorites:</strong> Remembering templates you have starred for quick comparison.</li>
            <li><strong>Advertising Delivery:</strong> Permitting advertising partners to display non-intrusive banner ads that sponsor our free platform.</li>
          </ul>
        </div>
      ),
    },
    contact: {
      title: 'Contact & Developer Inquiries',
      icon: Mail,
      body: (
        <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
          <p>
            Have feedback, a template feature request, or wish to collaborate with the coder behind FreeCV Studio? You can reach out directly:
          </p>

          <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={KAMRUL_PHOTO}
                alt="Md. Kamrul Islam"
                className="w-12 h-12 rounded-xl object-cover border border-blue-500/40"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-bold text-sm text-white">Md. Kamrul Islam</div>
                <div className="text-xs text-blue-400 font-mono">Lead Architect & Full-Stack Coder</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              <a
                href="https://wa.me/8801810811417"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-emerald-950/60 border border-emerald-800/80 rounded-lg text-emerald-300 hover:bg-emerald-900/60 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: 01810811417</span>
              </a>

              <a
                href="tel:01810811417"
                className="flex items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Phone: 01810811417</span>
              </a>

              <a
                href="mailto:mdkamrulislamnakir@gmail.com"
                className="flex items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">mdkamrulislamnakir@gmail.com</span>
              </a>

              <a
                href="https://alltechacademybd.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">alltechacademybd.blogspot.com</span>
              </a>

              <a
                href="https://github.com/MDkamrulIslamMIS"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Github className="w-4 h-4 text-slate-300 shrink-0" />
                <span className="truncate">github.com/MDkamrulIslamMIS</span>
              </a>

              <a
                href="https://www.linkedin.com/in/md-kamrul-islam1997"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="truncate">linkedin.com/in/md-kamrul-islam1997</span>
              </a>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
            <div className="font-semibold text-slate-800">Support & Operating Model:</div>
            <div>Free public web application for all job seekers worldwide. Open for software development inquiries and custom programming projects.</div>
          </div>
        </div>
      ),
    },
    guide: {
      title: 'Professional Resume Writing Guide',
      icon: BookOpen,
      body: (
        <div className="space-y-5 text-slate-600 text-xs sm:text-sm leading-relaxed">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-900">
            <h4 className="font-bold text-sm mb-1">Recruiter Insider Tip</h4>
            <p className="text-xs leading-relaxed">
              Corporate recruiters spend an average of <strong>6 to 7 seconds</strong> scanning an initial resume. Use quantifiable metrics ($ revenue, % turnaround improvement, hours saved) and front-load your strongest accomplishments.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">1. The Action-Impact Formula (X-Y-Z)</h4>
            <p>
              Structure every job bullet point using Google’s renowned formula: <em>"Accomplished [X] as measured by [Y], by doing [Z]."</em>
            </p>
            <p className="mt-1 text-xs text-slate-500 italic">
              Example: "Decreased production lead times by 22% across 14 garment factories by implementing automated ERP fabric reconciliation."
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">2. Beating ATS (Applicant Tracking Systems)</h4>
            <ul className="list-disc list-inside space-y-1 pl-2 text-xs">
              <li>Use standard headings: "Professional Experience", "Education", "Skills".</li>
              <li>Mirror keywords directly from the target job posting.</li>
              <li>Avoid burying vital credentials inside nested graphic textboxes.</li>
              <li>Stick to standard fonts such as Inter, Plus Jakarta Sans, or EB Garamond.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">3. Keep it to 1-2 Pages Maximum</h4>
            <p>
              Candidates with under 5 years of experience should maintain a concise 1-page CV. Senior professionals, executives, and academics may utilize 2 pages, provided every line contributes measurable value.
            </p>
          </div>
        </div>
      ),
    },
    faq: {
      title: 'Help & Frequently Asked Questions',
      icon: HelpCircle,
      body: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600">
          <p>You can find our comprehensive FAQ section right on the homepage, covering PDF printing, photo visibility, ATS compatibility, and device support.</p>
        </div>
      ),
    },
  };

  const current = contentMap[pageId] || contentMap.about;
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-8">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Icon className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold">{current.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">{current.body}</div>

        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
