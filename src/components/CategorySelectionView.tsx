import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  Briefcase,
  Layers,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { CV_CATEGORIES } from '../data/categories';
import { CategoryInfo } from '../types';
import { AdSlot } from './AdSlot';

interface CategorySelectionViewProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySelectionView: React.FC<CategorySelectionViewProps> = ({ onSelectCategory }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCategories = CV_CATEGORIES.filter((cat) => {
    const q = searchTerm.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.tagline.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q) ||
      cat.recruiterFocus.some((f) => f.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Category Top Ad Slot */}
      <AdSlot slot="categoryTop" />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
        
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-blue-100 mb-4">
            <Sparkles className="w-3.5 h-3.5" /> 20 Professional Career Categories
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Choose Your Profession to Access 20 Specialized Templates
          </h1>
          <p className="text-sm sm:text-base text-blue-100/90 mt-3 leading-relaxed">
            Every category includes tailored resume structures, recruiter-preferred terminology, and specialized fields calibrated to international hiring standards.
          </p>

          {/* Instant search bar */}
          <div className="mt-6 relative max-w-lg">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your field (e.g. Merchandiser, IT, Student, Finance)..."
              className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 bg-white text-slate-900 rounded-xl shadow-lg focus:outline-hidden focus:ring-4 focus:ring-blue-400/40"
            />
          </div>
        </div>
      </div>

      {/* Category Grid (20 Categories, each with 20 Templates) */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Browse Career Categories</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredCategories.length} industry paths • Exactly 20 templates per category
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl" role="img" aria-label={category.name}>
                    {category.icon}
                  </span>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-[11px] font-bold border border-blue-100">
                    20 Templates
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                  {category.tagline}
                </p>
                <p className="text-[11.5px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>

                {/* Recruiter focus chips */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {category.recruiterFocus.slice(0, 2).map((focus, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium"
                    >
                      {focus}
                    </span>
                  ))}
                  {category.recruiterFocus.length > 2 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{category.recruiterFocus.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  id={`cat-btn-${category.id}`}
                  onClick={() => onSelectCategory(category.id)}
                  className="w-full py-2.5 px-4 bg-slate-900 group-hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  Explore 20 Templates <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
