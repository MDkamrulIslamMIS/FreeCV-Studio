import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  Eye,
  Check,
  Sparkles,
  Shield,
  LayoutGrid,
  Columns,
  Image,
  ArrowRight,
} from 'lucide-react';
import { CVTemplate, CVData, StyleCustomization, SectionItem } from '../types';
import { ALL_TEMPLATES } from '../data/templates';
import { CV_CATEGORIES } from '../data/categories';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { AdSlot } from './AdSlot';

interface TemplateGalleryProps {
  selectedCategoryId: string;
  onSelectCategory: (catId: string) => void;
  activeTemplate: CVTemplate;
  onSelectTemplate: (template: CVTemplate) => void;
  cvData: CVData;
  customization: StyleCustomization;
  sections: SectionItem[];
  favorites: string[];
  onToggleFavorite: (templateId: string) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  selectedCategoryId,
  onSelectCategory,
  activeTemplate,
  onSelectTemplate,
  cvData,
  customization,
  sections,
  favorites,
  onToggleFavorite,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [atsFilter, setAtsFilter] = useState<'all' | 'ats-only'>('all');
  const [columnFilter, setColumnFilter] = useState<'all' | 'single' | 'two-column'>('all');
  const [photoFilter, setPhotoFilter] = useState<'all' | 'photo' | 'no-photo'>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [previewingTemplate, setPreviewingTemplate] = useState<CVTemplate | null>(null);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return ALL_TEMPLATES.filter((tpl) => {
      // Category match
      if (selectedCategoryId !== 'all' && tpl.categoryId !== selectedCategoryId) {
        return false;
      }
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(tpl.id)) {
        return false;
      }
      // Style filter
      if (selectedStyle !== 'all' && tpl.style !== selectedStyle) {
        return false;
      }
      // ATS filter
      if (atsFilter === 'ats-only' && !tpl.isATS) {
        return false;
      }
      // Column filter
      if (columnFilter === 'single' && tpl.layoutType !== 'single-column' && tpl.layoutType !== 'ats-pure') {
        return false;
      }
      if (
        columnFilter === 'two-column' &&
        tpl.layoutType !== 'two-column-left' &&
        tpl.layoutType !== 'two-column-right' &&
        tpl.layoutType !== 'sidebar-compact'
      ) {
        return false;
      }
      // Photo filter
      if (photoFilter === 'photo' && !tpl.hasPhoto) {
        return false;
      }
      if (photoFilter === 'no-photo' && tpl.hasPhoto) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = tpl.name.toLowerCase().includes(query);
        const matchesBest = tpl.bestSuitedFor.toLowerCase().includes(query);
        const matchesStyle = tpl.style.toLowerCase().includes(query);
        const category = CV_CATEGORIES.find((c) => c.id === tpl.categoryId);
        const matchesCategory = category?.name.toLowerCase().includes(query);
        if (!matchesName && !matchesBest && !matchesStyle && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [
    selectedCategoryId,
    showFavoritesOnly,
    favorites,
    selectedStyle,
    atsFilter,
    columnFilter,
    photoFilter,
    searchTerm,
  ]);

  const activeCategoryObj = CV_CATEGORIES.find((c) => c.id === selectedCategoryId);

  return (
    <div className="space-y-6">
      {/* Category selection banner & Ad Slot */}
      <AdSlot slot="templateTop" />

      {/* Header & Category Pills */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 400 Professional Templates
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {selectedCategoryId === 'all'
                ? 'All Professional Templates'
                : `${activeCategoryObj?.name || 'Category'} Resume Templates`}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedCategoryId === 'all'
                ? 'Choose from 20 distinct industries, tailored specifically for recruiter expectations.'
                : activeCategoryObj?.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                showFavoritesOnly
                  ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Star className={`w-4 h-4 ${showFavoritesOnly ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
              Favorites ({favorites.length})
            </button>
          </div>
        </div>

        {/* Category Horizontal Scroll Pills */}
        <div className="pt-4 overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max pb-1">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategoryId === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Categories (400)
            </button>
            {CV_CATEGORIES.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    isSelected ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    20
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search box */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search templates (e.g. IT, Student, Executive, Minimal)..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          {/* Style Filter */}
          <div>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700"
            >
              <option value="all">All Styles</option>
              <option value="Modern">Modern</option>
              <option value="Classic">Classic</option>
              <option value="Clean">Clean</option>
              <option value="Executive">Executive</option>
              <option value="Creative">Creative</option>
              <option value="Technical">Technical</option>
              <option value="Academic">Academic</option>
              <option value="Minimal">Minimal</option>
            </select>
          </div>

          {/* Column filter */}
          <div>
            <select
              value={columnFilter}
              onChange={(e) => setColumnFilter(e.target.value as any)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700"
            >
              <option value="all">Any Layout</option>
              <option value="single">Single Column</option>
              <option value="two-column">Two Column / Sidebar</option>
            </select>
          </div>

          {/* ATS filter */}
          <div>
            <select
              value={atsFilter}
              onChange={(e) => setAtsFilter(e.target.value as any)}
              className="w-full text-xs p-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-700"
            >
              <option value="all">All Templates</option>
              <option value="ats-only">ATS-Friendly Only</option>
            </select>
          </div>
        </div>

        {/* Quick toggles row */}
        <div className="flex items-center gap-2 pt-1 text-xs text-slate-600 flex-wrap">
          <span className="font-semibold text-slate-500">Quick Filter:</span>
          <button
            onClick={() => setPhotoFilter(photoFilter === 'photo' ? 'all' : 'photo')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
              photoFilter === 'photo' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 border-slate-200'
            }`}
          >
            With Photo
          </button>
          <button
            onClick={() => setPhotoFilter(photoFilter === 'no-photo' ? 'all' : 'no-photo')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
              photoFilter === 'no-photo' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 border-slate-200'
            }`}
          >
            No Photo
          </button>
          <span className="ml-auto text-slate-400">
            Showing <strong>{filteredTemplates.length}</strong> template{filteredTemplates.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Templates Grid (20 templates per category or all 400) */}
      {filteredTemplates.length === 0 ? (
        <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">No templates found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or relaxing the style/layout filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedStyle('all');
              setAtsFilter('all');
              setColumnFilter('all');
              setPhotoFilter('all');
              setShowFavoritesOnly(false);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTemplates.map((template) => {
            const isCurrent = activeTemplate.id === template.id;
            const isFav = favorites.includes(template.id);
            const category = CV_CATEGORIES.find((c) => c.id === template.categoryId);

            return (
              <div
                key={template.id}
                className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col overflow-hidden group ${
                  isCurrent
                    ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Template Visual Card / Mini Representation */}
                <div
                  className="h-44 p-4 relative flex flex-col justify-between overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: `${template.primaryColor}0a`,
                    borderBottom: `2px solid ${template.primaryColor}30`,
                  }}
                  onClick={() => setPreviewingTemplate(template)}
                >
                  {/* Decorative Mini Layout Representation */}
                  <div className="absolute inset-x-6 top-4 bottom-2 bg-white rounded-t-lg shadow-sm border border-slate-200 p-3 overflow-hidden pointer-events-none opacity-95 group-hover:scale-[1.02] transition-transform">
                    {/* Header bar */}
                    <div
                      className="h-2 rounded mb-2 w-2/3"
                      style={{ backgroundColor: template.primaryColor }}
                    />
                    <div className="h-1 bg-slate-200 rounded mb-3 w-1/3" />

                    {/* Columns representation */}
                    <div className="flex gap-2">
                      {template.layoutType === 'two-column-left' && (
                        <div className="w-1/3 space-y-1.5 border-r border-slate-100 pr-1.5">
                          <div className="h-1.5 bg-slate-200 rounded" />
                          <div className="h-1.5 bg-slate-100 rounded" />
                          <div className="h-1.5 bg-slate-100 rounded" />
                        </div>
                      )}
                      <div className="flex-1 space-y-1.5">
                        <div className="h-1.5 bg-slate-200 rounded w-full" />
                        <div className="h-1.5 bg-slate-100 rounded w-4/5" />
                        <div className="h-1.5 bg-slate-100 rounded w-3/4" />
                      </div>
                    </div>
                  </div>

                  {/* Top badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-2xs"
                      style={{
                        backgroundColor: template.primaryColor,
                        color: '#ffffff',
                      }}
                    >
                      {template.style}
                    </span>

                    <div className="flex items-center gap-1">
                      {template.isATS && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Shield className="w-2.5 h-2.5" /> ATS
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(template.id);
                        }}
                        className="p-1 rounded-md bg-white/90 hover:bg-white text-slate-400 hover:text-amber-500 transition-colors shadow-xs"
                        title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Hover Quick Preview Action */}
                  <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center pb-2">
                    <span className="px-3 py-1 bg-slate-900/90 text-white text-xs font-semibold rounded-full flex items-center gap-1 shadow-lg backdrop-blur-xs">
                      <Eye className="w-3 h-3" /> Quick Preview
                    </span>
                  </div>
                </div>

                {/* Template Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3 className="font-bold text-slate-900 text-sm">{template.name}</h3>
                      {isCurrent && (
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {template.bestSuitedFor}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setPreviewingTemplate(template)}
                      className="w-full py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
                    >
                      <Eye className="w-3 h-3" /> Preview
                    </button>
                    <button
                      onClick={() => onSelectTemplate(template)}
                      className={`w-full py-1.5 px-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1 transition-all shadow-xs ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {isCurrent ? <Check className="w-3 h-3" /> : null}
                      {isCurrent ? 'Selected' : 'Use Template'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Preview Modal */}
      <TemplatePreviewModal
        template={previewingTemplate}
        isOpen={!!previewingTemplate}
        onClose={() => setPreviewingTemplate(null)}
        onSelectTemplate={onSelectTemplate}
        cvData={cvData}
        customization={customization}
        sections={sections}
        isFavorite={previewingTemplate ? favorites.includes(previewingTemplate.id) : false}
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
};
