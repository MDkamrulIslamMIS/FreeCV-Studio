import React from 'react';
import { X, Check, Star, Download, Sparkles, Shield, User } from 'lucide-react';
import { CVTemplate, CVData, StyleCustomization, SectionItem } from '../types';
import { CVPreview } from './CVPreview';
import { DEFAULT_SAMPLE_CV } from '../data/sampleData';

interface TemplatePreviewModalProps {
  template: CVTemplate | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: CVTemplate) => void;
  cvData: CVData;
  customization: StyleCustomization;
  sections: SectionItem[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onSelectTemplate,
  cvData,
  customization,
  sections,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!isOpen || !template) return null;

  // Use current user CV data if filled, otherwise fallback to sample CV
  const previewData = cvData.personal.fullName ? cvData : DEFAULT_SAMPLE_CV;

  const previewCustomization: StyleCustomization = {
    ...customization,
    fontFamily: template.fontFamily,
    primaryColor: template.primaryColor,
    accentColor: template.accentColor,
    showPhoto: template.hasPhoto,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-slate-100 rounded-2xl shadow-2xl max-w-5xl w-full border border-slate-700 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(template.id)}
              className="p-1.5 rounded-lg text-amber-400 hover:bg-slate-800 transition-colors"
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{template.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-blue-900/60 text-blue-300 border border-blue-700/50">
                  {template.style}
                </span>
                {template.isATS && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> ATS-Ready
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{template.bestSuitedFor}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onSelectTemplate(template);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4" /> Use This Template
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live A4 Preview Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-200">
          <div className="scale-90 sm:scale-100 origin-top transition-transform shadow-2xl rounded-sm">
            <CVPreview
              cvData={previewData}
              template={template}
              customization={previewCustomization}
              sections={sections}
              isPreviewOnly={true}
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-white px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <span>
            Layout: <strong>{template.layoutType}</strong> • Font: <strong>{template.fontFamily}</strong> • Photo: <strong>{template.hasPhoto ? 'Enabled' : 'Disabled'}</strong>
          </span>
          <button
            onClick={() => {
              onSelectTemplate(template);
              onClose();
            }}
            className="text-blue-600 font-bold hover:underline"
          >
            Apply & Edit Information &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
