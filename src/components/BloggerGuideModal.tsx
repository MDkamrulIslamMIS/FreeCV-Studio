import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Code, Globe, HelpCircle, FileText, Download } from 'lucide-react';

interface BloggerGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BloggerGuideModal: React.FC<BloggerGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'instructions' | 'embed-code'>('instructions');

  if (!isOpen) return null;

  const sampleBloggerCode = `<!-- ======================================================= -->
<!-- FreeCV Studio – Blogger Standalone Integration Code       -->
<!-- Instructions: Paste this in Blogger -> Pages -> New Page -> HTML View -->
<!-- ======================================================= -->
<div id="freecv-studio-blogger-app" style="min-height: 800px; width: 100%; border: none;">
  <!-- FreeCV Studio Responsive Embed Container -->
  <iframe
    id="freecv-iframe"
    src="${window.location.origin}"
    style="width: 100%; height: 100vh; min-height: 880px; border: 0; display: block; overflow: auto;"
    allow="clipboard-write"
    title="FreeCV Studio Resume Builder"
  ></iframe>
</div>
<script>
  // Automatic height adjustment for Blogger themes
  window.addEventListener('message', function(e) {
    if (e.data && e.data.type === 'FREECV_RESIZE') {
      var frame = document.getElementById('freecv-iframe');
      if (frame) frame.style.height = e.data.height + 'px';
    }
  });
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleBloggerCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/20 rounded-lg">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Blogger Hosting & Integration Guide</h3>
              <p className="text-xs text-amber-100">Step-by-step instructions to run FreeCV Studio on Google Blogger</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-3 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('instructions')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'instructions'
                ? 'border-amber-600 text-amber-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            8-Step Blogger Setup Guide
          </button>
          <button
            onClick={() => setActiveTab('embed-code')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'embed-code'
                ? 'border-amber-600 text-amber-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Blogger HTML Embed Code
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-6 text-sm">
          {activeTab === 'instructions' ? (
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">1</span>
                  Create a Free Blogger Blog
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Go to <a href="https://www.blogger.com" target="_blank" rel="noreferrer" className="text-blue-600 font-semibold underline">blogger.com</a> and sign in with your Google account. Click <strong>"Create Blog"</strong>, pick a name (e.g. <em>FreeCV Studio</em>), and choose a free <code className="bg-slate-200 px-1 py-0.5 rounded text-[11px]">.blogspot.com</code> subdomain.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">2</span>
                  Prepare a Full-Width Theme or Clean Page
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Under Blogger Dashboard &rarr; <strong>Theme</strong>, select a clean modern theme like <strong>Contempo</strong> or <strong>Notable</strong>. If you prefer full-width, go to <strong>Layout</strong> and hide sidebars for standalone page presentation.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">3</span>
                  Create Necessary Static Pages
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  In Blogger Dashboard &rarr; <strong>Pages</strong> &rarr; <strong>New Page</strong>. Create your core site pages:
                </p>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-2">
                  <li><strong>CV Builder</strong> (Primary App page)</li>
                  <li><strong>About Us</strong> (Describes FreeCV Studio and free mission)</li>
                  <li><strong>Privacy Policy</strong> (Declares local browser-side data processing, zero data storage)</li>
                  <li><strong>Contact & FAQ</strong> (Common user questions and support email)</li>
                </ul>
              </div>

              {/* Step 4 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">4</span>
                  Adding the CV Builder Code
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Open your <strong>CV Builder</strong> page, switch from <em>Compose View</em> to <strong>HTML View</strong> (pencil icon at top-left). Paste the code provided in the <em>Blogger HTML Embed Code</em> tab. Save and publish.
                </p>
              </div>

              {/* Step 5 & 6 */}
              <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-950 text-base">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">5 & 6</span>
                  Adsterra Ads Configuration & Slot Management
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  Sign in to your <a href="https://adsterra.com" target="_blank" rel="noreferrer" className="text-amber-800 font-semibold underline">Adsterra Publisher</a> account:
                </p>
                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-2">
                  <li>Generate your Native Banner or 728x90 / 300x250 script units.</li>
                  <li>Open <strong>Admin Ad Settings</strong> in FreeCV Studio (top-right gear icon).</li>
                  <li>Paste your Adsterra code into the designated slots (Header, Category, Template, Form, Download).</li>
                  <li>Empty slots automatically hide so your site always looks clean and professional.</li>
                  <li>Alternatively, paste Adsterra scripts directly into Blogger Theme &rarr; <strong>Layout</strong> &rarr; <strong>HTML/JavaScript Gadgets</strong>.</li>
                </ul>
              </div>

              {/* Step 7 & 8 */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center">7 & 8</span>
                  Publishing & Connecting a Custom Domain
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Click <strong>Publish</strong>. Your CV Builder is now 100% live on your Blogspot address. Later, you can connect any custom domain (e.g. <em>www.freecvstudio.com</em>) under Blogger &rarr; <strong>Settings</strong> &rarr; <strong>Publishing</strong> &rarr; <strong>Custom Domain</strong> with free automated SSL from Google!
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">One-Click Blogger Embed Code</h4>
                  <p className="text-xs text-slate-500">Copy and paste this directly into any Blogger Page or Post in HTML view.</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy Blogger Code'}
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto max-h-80 leading-relaxed border border-slate-800">
                  {sampleBloggerCode}
                </pre>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900">
                <div className="font-semibold mb-1">💡 Architecture Note: Zero Server Cost</div>
                <p className="leading-relaxed">
                  FreeCV Studio performs all CV generation, template swapping, A4 layout scaling, and PDF printing completely inside the user's browser. It requires zero server infrastructure, zero database setup, and runs smoothly on 100% free Blogger hosting.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Engineered for Google Blogger, WordPress, and static hosts.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
