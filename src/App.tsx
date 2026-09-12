import React, { useState, useEffect } from 'react';
import {
  Download,
  Printer,
  RotateCcw,
  Sparkles,
  FileText,
  Palette,
  Eye,
  Layers,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Loader2,
  X,
  ExternalLink,
} from 'lucide-react';
import { exportCVToPDF } from './utils/pdfExport';

import {
  CVData,
  CVTemplate,
  StyleCustomization,
  SectionItem,
} from './types';

import { ALL_TEMPLATES, DEFAULT_SECTIONS } from './data/templates';
import { CV_CATEGORIES } from './data/categories';
import { DEFAULT_SAMPLE_CV, EMPTY_CV } from './data/sampleData';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';
import { CategorySelectionView } from './components/CategorySelectionView';
import { TemplateGallery } from './components/TemplateGallery';
import { CVForm } from './components/CVForm';
import { CVPreview } from './components/CVPreview';
import { CustomizerToolbar } from './components/CustomizerToolbar';
import { SectionManagerModal } from './components/SectionManagerModal';
import { ClearConfirmModal } from './components/ClearConfirmModal';
import { BloggerGuideModal } from './components/BloggerGuideModal';
import { AdminAdModal } from './components/AdminAdModal';
import { StaticPageModal } from './components/StaticPageModal';
import { FAQSection } from './components/FAQSection';
import { AdSlot } from './components/AdSlot';

type ViewMode = 'home' | 'categories' | 'templates' | 'builder';

export function App() {
  // Current view state
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('it-software');
  const [activeTemplate, setActiveTemplate] = useState<CVTemplate>(
    () => ALL_TEMPLATES.find((t) => t.categoryId === 'it-software') || ALL_TEMPLATES[0]
  );

  // Modals state
  const [isBloggerGuideOpen, setIsBloggerGuideOpen] = useState<boolean>(false);
  const [isAdminAdModalOpen, setIsAdminAdModalOpen] = useState<boolean>(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState<boolean>(false);
  const [isSectionManagerOpen, setIsSectionManagerOpen] = useState<boolean>(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);
  const [staticPage, setStaticPage] = useState<
    'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookies' | 'guide' | 'faq' | null
  >(null);

  // Builder Mobile Tab: 'edit' or 'preview'
  const [builderTab, setBuilderTab] = useState<'edit' | 'preview'>('edit');
  const [previewZoom, setPreviewZoom] = useState<number>(100);

  // CV Data state with local storage hydration
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem('freecv_studio_user_cv');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatically migrate to Md. Kamrul Islam's official data and photo if empty or previously loaded with placeholder
        if (
          !parsed.personal?.fullName ||
          parsed.personal?.fullName?.includes('Alexander Vance') ||
          parsed.personal?.photoUrl?.includes('unsplash')
        ) {
          return DEFAULT_SAMPLE_CV;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SAMPLE_CV;
  });

  // Customization state
  const [customization, setCustomization] = useState<StyleCustomization>(() => {
    try {
      const saved = localStorage.getItem('freecv_studio_customization');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      templateId: ALL_TEMPLATES[0].id,
      fontFamily: ALL_TEMPLATES[0].fontFamily,
      fontSize: 'medium',
      primaryColor: ALL_TEMPLATES[0].primaryColor,
      accentColor: ALL_TEMPLATES[0].accentColor,
      lineSpacing: 'normal',
      sectionSpacing: 'standard',
      showPhoto: true,
      showIcons: true,
      showSidebar: true,
    };
  });

  // Section arrangement state
  const [sections, setSections] = useState<SectionItem[]>(() => {
    try {
      const saved = localStorage.getItem('freecv_studio_sections');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SECTIONS;
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('freecv_studio_favorites');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem('freecv_studio_user_cv', JSON.stringify(cvData));
    } catch (e) {
      console.error(e);
    }
  }, [cvData]);

  useEffect(() => {
    try {
      localStorage.setItem('freecv_studio_customization', JSON.stringify(customization));
    } catch (e) {
      console.error(e);
    }
  }, [customization]);

  useEffect(() => {
    try {
      localStorage.setItem('freecv_studio_sections', JSON.stringify(sections));
    } catch (e) {
      console.error(e);
    }
  }, [sections]);

  useEffect(() => {
    try {
      localStorage.setItem('freecv_studio_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Favorite toggle handler
  const handleToggleFavorite = (templateId: string) => {
    setFavorites((prev) =>
      prev.includes(templateId) ? prev.filter((id) => id !== templateId) : [...prev, templateId]
    );
  };

  // Category selection handler
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    // Find the first template in this category if available
    const firstTpl = ALL_TEMPLATES.find((t) => t.categoryId === categoryId);
    if (firstTpl) {
      setActiveTemplate(firstTpl);
      setCustomization((prev) => ({
        ...prev,
        templateId: firstTpl.id,
        primaryColor: firstTpl.primaryColor,
        accentColor: firstTpl.accentColor,
        fontFamily: firstTpl.fontFamily,
      }));
    }
    setCurrentView('templates');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Template selection handler
  const handleSelectTemplate = (template: CVTemplate) => {
    setActiveTemplate(template);
    setSelectedCategoryId(template.categoryId);
    setCustomization((prev) => ({
      ...prev,
      templateId: template.id,
      primaryColor: template.primaryColor,
      accentColor: template.accentColor,
      fontFamily: template.fontFamily,
      showPhoto: template.hasPhoto,
    }));
    setCurrentView('builder');
    setIsTemplateModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load sample CV handler
  const handleLoadSample = () => {
    setCvData(DEFAULT_SAMPLE_CV);
  };

  // Clear CV handler
  const handleConfirmClear = () => {
    setCvData(EMPTY_CV);
  };

  // PDF generation and print handlers
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);
  const [downloadResult, setDownloadResult] = useState<{ url: string; fileName: string } | null>(null);

  const handleDownloadPDF = async () => {
    if (isGeneratingPdf) return;
    const rawName = cvData.personal.fullName?.trim() || 'Professional_CV';
    const cleanName = rawName.replace(/[^a-zA-Z0-9_-]/g, '_');
    setIsGeneratingPdf(true);

    // Switch to preview tab so the printable element is fully mounted and rendered in DOM
    setBuilderTab('preview');

    // Wait for state change and DOM layout reflow
    await new Promise((resolve) => setTimeout(resolve, 180));

    try {
      const res = await exportCVToPDF('cv-preview-printable', {
        fileName: `${cleanName}_CV.pdf`,
        onSuccess: (result) => {
          setIsGeneratingPdf(false);
          setDownloadSuccessToast(true);
          if (result.blobUrl) {
            setDownloadResult({ url: result.blobUrl, fileName: result.fileName || `${cleanName}_CV.pdf` });
          }
          setTimeout(() => setDownloadSuccessToast(false), 5000);
        },
        onError: (err) => {
          console.error('PDF Generation Error:', err);
          setIsGeneratingPdf(false);
          // Fallback: trigger native print
          handlePrint();
        },
      });

      if (!res.success) {
        setIsGeneratingPdf(false);
        handlePrint();
      }
    } catch (e) {
      console.error('Export exception:', e);
      setIsGeneratingPdf(false);
      handlePrint();
    }
  };

  const handlePrint = () => {
    setBuilderTab('preview');
    // Ensure styles and layout are ready, then synchronously trigger print
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // Secret Owner shortcut: Ctrl+Shift+A (or Cmd+Shift+A) to open Admin Control Center
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminAdModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        activeView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBloggerGuide={() => setIsBloggerGuideOpen(true)}
        onOpenAdminAd={() => setIsAdminAdModalOpen(true)}
        onOpenAdminAds={() => setIsAdminAdModalOpen(true)}
        onOpenClearConfirm={() => setIsClearModalOpen(true)}
        onDownloadPdf={handleDownloadPDF}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* VIEW 1: HOME */}
        {currentView === 'home' && (
          <div className="space-y-12">
            <HomeHero
              onCreateCVNow={() => {
                setCurrentView('builder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreCategories={() => {
                setCurrentView('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBrowseTemplates={() => {
                setSelectedCategoryId('all');
                setCurrentView('templates');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 20 Categories showcase right on the homepage */}
            <CategorySelectionView onSelectCategory={handleSelectCategory} />

            {/* Bottom Download Banner Ad slot */}
            <AdSlot slot="downloadArea" />

            {/* FAQ Section */}
            <FAQSection />
          </div>
        )}

        {/* VIEW 2: CATEGORIES */}
        {currentView === 'categories' && (
          <CategorySelectionView onSelectCategory={handleSelectCategory} />
        )}

        {/* VIEW 3: TEMPLATES GALLERY */}
        {currentView === 'templates' && (
          <TemplateGallery
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={(catId) => setSelectedCategoryId(catId)}
            activeTemplate={activeTemplate}
            onSelectTemplate={handleSelectTemplate}
            cvData={cvData}
            customization={customization}
            sections={sections}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* VIEW 4: BUILDER & LIVE PREVIEW */}
        {currentView === 'builder' && (
          <div className="space-y-6">
            {/* Action Bar for Builder */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentView('templates')}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors text-xs font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Templates
                </button>
                <div className="h-5 w-px bg-slate-200" />
                <div>
                  <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{activeTemplate.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {activeTemplate.style}
                    </span>
                  </h2>
                  <span className="text-[11px] text-slate-500">A4 High-Resolution Ready</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  id="builder-load-sample-btn"
                  onClick={handleLoadSample}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                  title="Load sample CV data to see design"
                >
                  Load Sample Data
                </button>

                <button
                  id="builder-clear-cv-btn"
                  onClick={() => setIsClearModalOpen(true)}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl transition-colors border border-rose-200 flex items-center gap-1"
                  title="Clear all fields"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear CV
                </button>

                <button
                  id="builder-print-btn"
                  onClick={handlePrint}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
                  title="Print directly to paper or save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" /> Print CV
                </button>

                <button
                  id="builder-download-pdf-btn"
                  onClick={handleDownloadPDF}
                  disabled={isGeneratingPdf}
                  className={`px-4 py-2 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all ${
                    isGeneratingPdf
                      ? 'bg-blue-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                  }`}
                  title="Directly download clean A4 PDF file"
                >
                  {isGeneratingPdf ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" /> Download PDF
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Customizer Toolbar */}
            <CustomizerToolbar
              customization={customization}
              onUpdate={(updated) => setCustomization((prev) => ({ ...prev, ...updated }))}
              currentTemplate={activeTemplate}
              onOpenTemplateSelector={() => setIsTemplateModalOpen(true)}
              onOpenSectionManager={() => setIsSectionManagerOpen(true)}
            />

            {/* Mobile View Toggle (Edit Form vs Live Preview) */}
            <div className="flex lg:hidden bg-slate-200 p-1 rounded-xl text-xs font-bold print:hidden">
              <button
                onClick={() => setBuilderTab('edit')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  builderTab === 'edit' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                1. Edit CV Details
              </button>
              <button
                onClick={() => setBuilderTab('preview')}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  builderTab === 'preview' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                2. Live A4 Preview
              </button>
            </div>

            {/* Dual Column Builder Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Multi-Step Form */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  builderTab === 'edit' ? 'block' : 'hidden lg:block'
                }`}
              >
                <CVForm
                  cvData={cvData}
                  onChange={setCvData}
                  selectedCategoryId={selectedCategoryId}
                  onDownloadPdf={handleDownloadPDF}
                  onPrint={handlePrint}
                  onViewPreview={() => setBuilderTab('preview')}
                  isGeneratingPdf={isGeneratingPdf}
                />
              </div>

              {/* Right Column: Live A4 Preview Container */}
              <div
                className={`lg:col-span-6 sticky top-20 space-y-4 ${
                  builderTab === 'preview' ? 'block' : 'hidden lg:block'
                }`}
              >
                {/* Zoom & Quick Controls Header */}
                <div className="flex items-center justify-between px-2 text-xs text-slate-500 print:hidden">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-blue-600" /> Real-time A4 Print Preview
                  </span>
                  <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    <button
                      onClick={() => setPreviewZoom((z) => Math.max(60, z - 10))}
                      className="text-slate-600 hover:text-slate-900"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono font-bold w-10 text-center">
                      {previewZoom}%
                    </span>
                    <button
                      onClick={() => setPreviewZoom((z) => Math.min(130, z + 10))}
                      className="text-slate-600 hover:text-slate-900"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Printable Document Box */}
                <div className="bg-slate-200/80 p-3 sm:p-6 rounded-2xl border border-slate-300/80 overflow-x-auto flex justify-center shadow-inner">
                  <div
                    style={{
                      transform: `scale(${previewZoom / 100})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <CVPreview
                      cvData={cvData}
                      template={activeTemplate}
                      customization={customization}
                      sections={sections}
                    />
                  </div>
                </div>

                {/* Dedicated PDF Download & Export Action Card */}
                <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3 print:hidden">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <Download className="w-4 h-4 text-blue-600" />
                        Ready to Download Your Professional CV?
                      </h4>
                      <p className="text-xs text-slate-500">
                        100% Free • High-Resolution Vector A4 • ATS-Friendly
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={handlePrint}
                        className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 border border-slate-300"
                        title="Open system print dialogue"
                      >
                        <Printer className="w-3.5 h-3.5" /> Print
                      </button>

                      <button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPdf}
                        className={`flex-1 sm:flex-initial px-5 py-2.5 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                          isGeneratingPdf
                            ? 'bg-blue-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-600/30'
                        }`}
                      >
                        {isGeneratingPdf ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Creating PDF...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            Download PDF (.pdf)
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* High-value Download Area Ad Slot */}
                  <AdSlot slot="downloadArea" />
                </div>

                {/* Helpful Recruiter & Print Tip */}
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 print:hidden flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Export Tip:</strong> Clicking <strong>"Download PDF"</strong> will instantly generate and save an official A4 PDF document to your device. You can also use <strong>"Print"</strong> to send it straight to a physical printer or choose <em>"Save as PDF"</em> in your browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenStaticPage={(p) => setStaticPage(p as any)}
        onOpenBloggerGuide={() => setIsBloggerGuideOpen(true)}
        onOpenAdminAd={() => setIsAdminAdModalOpen(true)}
        onOpenFAQ={() => {
          setCurrentView('home');
          setTimeout(() => {
            const el = document.getElementById('faq-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      {/* MODALS */}
      {/* 1. Blogger Guide Modal */}
      <BloggerGuideModal
        isOpen={isBloggerGuideOpen}
        onClose={() => setIsBloggerGuideOpen(false)}
      />

      {/* 2. Admin Ad Settings Modal */}
      <AdminAdModal
        isOpen={isAdminAdModalOpen}
        onClose={() => setIsAdminAdModalOpen(false)}
      />

      {/* 3. Clear CV Confirmation Modal */}
      <ClearConfirmModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleConfirmClear}
      />

      {/* 4. Section Manager Modal */}
      <SectionManagerModal
        isOpen={isSectionManagerOpen}
        onClose={() => setIsSectionManagerOpen(false)}
        sections={sections}
        onUpdateSections={setSections}
      />

      {/* 5. Static Pages Modal (About, Privacy, Terms, Guide, etc.) */}
      <StaticPageModal
        pageId={staticPage}
        onClose={() => setStaticPage(null)}
      />

      {/* 6. Template Selector Modal (from inside the builder) */}
      {isTemplateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="bg-slate-100 rounded-2xl shadow-2xl max-w-6xl w-full border border-slate-700 overflow-hidden flex flex-col max-h-[92vh]">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-base">Select from 400 Professional Templates</h3>
              </div>
              <button
                onClick={() => setIsTemplateModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <TemplateGallery
                selectedCategoryId={selectedCategoryId}
                onSelectCategory={(catId) => setSelectedCategoryId(catId)}
                activeTemplate={activeTemplate}
                onSelectTemplate={handleSelectTemplate}
                cvData={cvData}
                customization={customization}
                sections={sections}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </div>
        </div>
      )}

      {/* PDF Download Success Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/40">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-white">PDF Downloaded Successfully!</div>
            <div className="text-xs text-slate-300">Your high-resolution CV was saved to your device.</div>
          </div>
        </div>
      )}

      {/* Direct Download & Print Hub Modal */}
      {downloadResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-4 animate-in zoom-in-95">
            <div className="flex justify-end">
              <button
                onClick={() => setDownloadResult(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner -mt-4">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Your CV is Ready to Save!
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                {downloadResult.fileName}
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-left space-y-1">
              <p className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-emerald-700" />
                সরাসরি সেভ করার সহজ নিয়ম:
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                নিচের <strong>&quot;Save as PDF / Print&quot;</strong> বাটনে চাপ দিন। তারপর প্রিন্ট উইন্ডোতে Destination থেকে <strong>&quot;Save as PDF&quot;</strong> সিলেক্ট করে <strong>Save</strong> বাটনে ক্লিক করলেই আপনার CV সেভ হয়ে যাবে।
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                id="modal-save-pdf-print-btn"
                onClick={() => {
                  setDownloadResult(null);
                  handlePrint();
                }}
                className="w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Printer className="w-4 h-4" /> Save as PDF / Print Now
              </button>

              <a
                id="modal-direct-download-link"
                href={downloadResult.url}
                download={downloadResult.fileName}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setTimeout(() => setDownloadResult(null), 2000);
                }}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download File Directly (.pdf)
              </a>

              <a
                href={window.location.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 text-slate-500 hover:text-blue-600 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                title="Open full page in new tab for direct download without iframe constraints"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open in New Tab (প্রিভিউ ছাড়া নতুন ট্যাবে খুলুন)
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
