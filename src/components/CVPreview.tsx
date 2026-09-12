import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  MessageCircle,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  Layers,
  Code,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  User,
} from 'lucide-react';
import { CVData, CVTemplate, StyleCustomization, SectionItem } from '../types';
import { CV_CATEGORIES } from '../data/categories';

interface CVPreviewProps {
  cvData: CVData;
  template: CVTemplate;
  customization: StyleCustomization;
  sections: SectionItem[];
  isPreviewOnly?: boolean;
}

export const CVPreview: React.FC<CVPreviewProps> = ({
  cvData,
  template,
  customization,
  sections,
  isPreviewOnly = false,
}) => {
  const { personal, professionalSummary, careerObjective, summaryType } = cvData;
  const activeCategory = CV_CATEGORIES.find((c) => c.id === template.categoryId);

  // Active theme settings
  const primaryColor = customization.primaryColor || template.primaryColor;
  const accentColor = customization.accentColor || template.accentColor;
  const fontFamily = customization.fontFamily || template.fontFamily;
  const showPhoto = customization.showPhoto && personal.photoUrl;
  const showIcons = customization.showIcons;
  const layout = template.layoutType;

  // Spacing and sizing classes
  const spacingClass =
    customization.sectionSpacing === 'compact'
      ? 'space-y-3 mb-3'
      : customization.sectionSpacing === 'generous'
      ? 'space-y-6 mb-6'
      : 'space-y-4 mb-4';

  const textSizeClass =
    customization.fontSize === 'small'
      ? 'text-[11px] leading-relaxed'
      : customization.fontSize === 'large'
      ? 'text-[13px] leading-relaxed'
      : 'text-[12px] leading-relaxed';

  const headingSizeClass =
    customization.fontSize === 'small'
      ? 'text-xs font-bold tracking-wider'
      : customization.fontSize === 'large'
      ? 'text-sm font-bold tracking-wider'
      : 'text-xs sm:text-[13px] font-bold tracking-wider';

  // Check section visibility
  const isSectionVisible = (secId: string) => {
    const sec = sections.find((s) => s.id === secId);
    return sec ? sec.visible : true;
  };

  const getSectionTitle = (secId: string, defaultTitle: string) => {
    const sec = sections.find((s) => s.id === secId);
    return sec ? sec.name : defaultTitle;
  };

  // --- Sub-renderer: Category Custom Fields ---
  const renderCategoryFields = () => {
    if (!activeCategory || !activeCategory.customFields || !isSectionVisible('categoryFields')) {
      return null;
    }

    const filledFields = activeCategory.customFields.filter(
      (f) => cvData.categoryFields && cvData.categoryFields[f.id]?.trim()
    );

    if (filledFields.length === 0) return null;

    return (
      <div className={`cv-section-block ${spacingClass}`}>
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: primaryColor }}>
          {showIcons && <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
          <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
            {getSectionTitle('categoryFields', `${activeCategory.name} Specialization`)}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {filledFields.map((field) => (
            <div
              key={field.id}
              className="p-2.5 rounded-md border text-xs"
              style={{
                backgroundColor: `${primaryColor}08`,
                borderColor: `${primaryColor}25`,
              }}
            >
              <div className="font-bold text-[11px] tracking-wide mb-1" style={{ color: primaryColor }}>
                {field.label}
              </div>
              <div className="text-slate-800 font-medium text-[11.5px] leading-snug break-words">
                {cvData.categoryFields[field.id]}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Sub-renderer: Summary & Objective ---
  const renderSummary = () => {
    if (!isSectionVisible('summary')) return null;
    const hasSummary = (summaryType === 'summary' || summaryType === 'both') && professionalSummary;
    const hasObjective = (summaryType === 'objective' || summaryType === 'both') && careerObjective;

    if (!hasSummary && !hasObjective) return null;

    return (
      <div className={`cv-section-block ${spacingClass}`}>
        {hasSummary && (
          <div className="mb-2.5">
            <div className="flex items-center gap-2 pb-1 border-b mb-1.5" style={{ borderColor: primaryColor }}>
              {showIcons && <User className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
              <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
                {getSectionTitle('summary', 'Professional Profile')}
              </h3>
            </div>
            <p className={`${textSizeClass} text-slate-700 leading-relaxed font-normal`}>
              {professionalSummary}
            </p>
          </div>
        )}
        {hasObjective && (
          <div>
            <div className="flex items-center gap-2 pb-1 border-b mb-1.5" style={{ borderColor: primaryColor }}>
              {showIcons && <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
              <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
                Career Objective
              </h3>
            </div>
            <p className={`${textSizeClass} text-slate-700 leading-relaxed font-normal`}>
              {careerObjective}
            </p>
          </div>
        )}
      </div>
    );
  };

  // --- Sub-renderer: Work Experience ---
  const renderExperience = () => {
    if (!isSectionVisible('experience') || !cvData.experience || cvData.experience.length === 0) return null;

    return (
      <div className={`cv-section-block ${spacingClass}`}>
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: primaryColor }}>
          {showIcons && <Briefcase className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
          <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
            {getSectionTitle('experience', 'Professional Experience')}
          </h3>
        </div>
        <div className="space-y-3.5 pt-1">
          {cvData.experience.map((exp) => (
            <div
              key={exp.id}
              className={`cv-section-block relative ${
                layout === 'timeline' ? 'pl-4 border-l-2 border-slate-300' : ''
              }`}
            >
              {layout === 'timeline' && (
                <div
                  className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full"
                  style={{ backgroundColor: primaryColor }}
                />
              )}
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <span className="font-bold text-slate-900 text-[12.5px] tracking-tight">{exp.jobTitle}</span>
                <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate || 'Present'}
                </span>
              </div>
              <div className="text-[11.5px] font-semibold text-slate-700 mb-1 flex items-center justify-between">
                <span>{exp.company}</span>
                {exp.location && <span className="text-[10.5px] font-normal text-slate-500">{exp.location}</span>}
              </div>
              {exp.responsibilities && (
                <p className={`${textSizeClass} text-slate-600 leading-relaxed mb-1 whitespace-pre-line`}>
                  {exp.responsibilities}
                </p>
              )}
              {exp.achievements && (
                <div
                  className="text-[11.5px] p-2 rounded bg-slate-50 border-l-2 text-slate-700 mt-1"
                  style={{ borderColor: accentColor }}
                >
                  <span className="font-semibold text-slate-900">Key Milestone: </span>
                  {exp.achievements}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Sub-renderer: Education ---
  const renderEducation = () => {
    if (!isSectionVisible('education') || !cvData.education || cvData.education.length === 0) return null;

    return (
      <div className={`cv-section-block ${spacingClass}`}>
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: primaryColor }}>
          {showIcons && <GraduationCap className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
          <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
            {getSectionTitle('education', 'Education & Qualifications')}
          </h3>
        </div>
        <div className="space-y-3 pt-1">
          {cvData.education.map((edu) => (
            <div key={edu.id} className="cv-section-block">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <span className="font-bold text-slate-900 text-[12.5px]">{edu.degree}</span>
                <span className="text-[11px] font-medium text-slate-500">
                  {edu.startYear} – {edu.endYear || 'Present'}
                </span>
              </div>
              <div className="text-[11.5px] font-semibold text-slate-700">{edu.institution}</div>
              {edu.subject && <div className="text-[11px] text-slate-600">{edu.subject}</div>}
              {edu.result && (
                <div className="text-[11px] font-semibold text-slate-800 mt-0.5">
                  Result / Honors: <span className="font-normal text-slate-600">{edu.result}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Sub-renderer: Skills ---
  const renderSkills = (isSidebar = false) => {
    if (!isSectionVisible('skills') || !cvData.skills || cvData.skills.length === 0) return null;

    return (
      <div className={`cv-section-block ${spacingClass}`}>
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: primaryColor }}>
          {showIcons && <Layers className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
          <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
            {getSectionTitle('skills', 'Skills & Expertise')}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {cvData.skills.map((skill) => (
            <div
              key={skill.id}
              className={`px-2 py-1 rounded text-[11px] font-medium border flex items-center gap-1.5 ${
                isSidebar
                  ? 'bg-white/80 text-slate-900 border-slate-300 shadow-2xs'
                  : 'bg-slate-50 text-slate-800 border-slate-200'
              }`}
            >
              <span>{skill.name}</span>
              {skill.level && (
                <span
                  className="text-[9.5px] px-1 rounded font-semibold uppercase"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  {skill.level}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Sub-renderer: Projects ---
  const renderProjects = () => {
    if (!isSectionVisible('projects') || !cvData.projects || cvData.projects.length === 0) return null;

    return (
      <div className={`cv-section-block ${spacingClass}`}>
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: primaryColor }}>
          {showIcons && <Code className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
          <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
            {getSectionTitle('projects', 'Key Projects')}
          </h3>
        </div>
        <div className="space-y-3 pt-1">
          {cvData.projects.map((proj) => (
            <div key={proj.id} className="cv-section-block">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <span className="font-bold text-slate-900 text-[12.5px] flex items-center gap-1">
                  {proj.projectName}
                  {proj.projectLink && (
                    <a
                      href={proj.projectLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      <ExternalLink className="w-3 h-3 inline" />
                    </a>
                  )}
                </span>
                {proj.role && <span className="text-[11px] font-semibold text-slate-600">Role: {proj.role}</span>}
              </div>
              {proj.description && (
                <p className={`${textSizeClass} text-slate-600 leading-relaxed mt-0.5`}>{proj.description}</p>
              )}
              {proj.technologies && (
                <div className="text-[10.5px] text-slate-500 mt-1">
                  <span className="font-semibold text-slate-700">Technologies/Tools: </span>
                  {proj.technologies}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Sub-renderer: Certifications ---
  const renderCertifications = (isSidebar = false) => {
    if (!isSectionVisible('certifications') || !cvData.certifications || cvData.certifications.length === 0)
      return null;

    return (
      <div className={`cv-section-block ${spacingClass}`}>
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: primaryColor }}>
          {showIcons && <CheckCircle2 className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
          <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
            {getSectionTitle('certifications', 'Certifications & Licenses')}
          </h3>
        </div>
        <div className="space-y-2 pt-1">
          {cvData.certifications.map((cert) => (
            <div key={cert.id} className="text-xs">
              <div className="font-bold text-slate-900 text-[11.5px]">{cert.certification}</div>
              <div className="text-[11px] text-slate-600 flex items-center justify-between">
                <span>{cert.organization}</span>
                <span>{cert.date}</span>
              </div>
              {cert.credentialId && (
                <div className="text-[10px] text-slate-500">ID: {cert.credentialId}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Sub-renderer: Languages ---
  const renderLanguages = (isSidebar = false) => {
    if (!isSectionVisible('languages') || !cvData.languages || cvData.languages.length === 0) return null;

    return (
      <div className={`cv-section-block ${spacingClass}`}>
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: primaryColor }}>
          {showIcons && <Globe className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
          <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
            {getSectionTitle('languages', 'Languages')}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-900 text-[11px]">{lang.language}</span>
              <span className="text-[10px] text-slate-500">{lang.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Sub-renderer: Awards ---
  const renderAwards = () => {
    if (!isSectionVisible('awards') || !cvData.awards || cvData.awards.length === 0) return null;

    return (
      <div className={`cv-section-block ${spacingClass}`}>
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: primaryColor }}>
          {showIcons && <Award className="w-3.5 h-3.5" style={{ color: primaryColor }} />}
          <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
            {getSectionTitle('awards', 'Honors & Awards')}
          </h3>
        </div>
        <div className="space-y-2 pt-1 text-xs">
          {cvData.awards.map((aw) => (
            <div key={aw.id}>
              <div className="flex justify-between font-bold text-slate-900 text-[11.5px]">
                <span>{aw.award}</span>
                <span className="text-slate-500 text-[11px] font-normal">{aw.date}</span>
              </div>
              <div className="text-[11px] text-slate-600 font-medium">{aw.organization}</div>
              {aw.description && <p className="text-[11px] text-slate-500 mt-0.5">{aw.description}</p>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- Sub-renderer: References ---
  const renderReferences = () => {
    if (!cvData.showReferences || !isSectionVisible('references')) return null;

    if (!cvData.references || cvData.references.length === 0) {
      return (
        <div className={`cv-section-block ${spacingClass}`}>
          <div className="flex items-center gap-2 pb-1 border-b" style={{ borderColor: primaryColor }}>
            <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
              {getSectionTitle('references', 'References')}
            </h3>
          </div>
          <p className="text-[11.5px] text-slate-600 italic pt-1">References available upon request.</p>
        </div>
      );
    }

    return (
      <div className={`cv-section-block ${spacingClass}`}>
        <div className="flex items-center gap-2 pb-1.5 border-b" style={{ borderColor: primaryColor }}>
          <h3 className={`${headingSizeClass} uppercase tracking-wider`} style={{ color: primaryColor }}>
            {getSectionTitle('references', 'References')}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
          {cvData.references.map((ref) => (
            <div key={ref.id} className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-[11.5px]">{ref.name}</div>
              <div className="text-[11px] text-slate-600">
                {ref.position} {ref.company ? `at ${ref.company}` : ''}
              </div>
              {ref.phone && <div className="text-[10.5px] text-slate-500 mt-0.5">Tel: {ref.phone}</div>}
              {ref.email && <div className="text-[10.5px] text-slate-500">Email: {ref.email}</div>}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Contact list renderer
  const renderContactInfo = (horizontal = true) => (
    <div
      className={`text-[11px] text-slate-600 ${
        horizontal
          ? 'flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2'
          : 'space-y-1.5 text-xs'
      }`}
    >
      {personal.email && (
        <span className="flex items-center gap-1">
          {showIcons && <Mail className="w-3 h-3 text-slate-400 shrink-0" />}
          <span className="break-all">{personal.email}</span>
        </span>
      )}
      {personal.phone && (
        <span className="flex items-center gap-1">
          {showIcons && <Phone className="w-3 h-3 text-slate-400 shrink-0" />}
          <span>
            {personal.phone}
            {personal.whatsapp && personal.whatsapp === personal.phone && (
              <span className="ml-1 text-[9.5px] px-1.5 py-0.2 font-bold rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-300">
                WhatsApp
              </span>
            )}
          </span>
        </span>
      )}
      {personal.whatsapp && personal.whatsapp !== personal.phone && (
        <span className="flex items-center gap-1">
          {showIcons && <MessageCircle className="w-3 h-3 text-emerald-600 shrink-0" />}
          <span>{personal.whatsapp} (WhatsApp)</span>
        </span>
      )}
      {(personal.address || personal.country) && (
        <span className="flex items-center gap-1">
          {showIcons && <MapPin className="w-3 h-3 text-slate-400 shrink-0" />}
          <span>{[personal.address, personal.country].filter(Boolean).join(', ')}</span>
        </span>
      )}
      {personal.linkedIn && (
        <span className="flex items-center gap-1">
          {showIcons && <Linkedin className="w-3 h-3 text-slate-400 shrink-0" />}
          <span className="break-all">{personal.linkedIn}</span>
        </span>
      )}
      {personal.github && (
        <span className="flex items-center gap-1">
          {showIcons && <Github className="w-3 h-3 text-slate-500 shrink-0" />}
          <span className="break-all">{personal.github}</span>
        </span>
      )}
      {personal.portfolio && (
        <span className="flex items-center gap-1">
          {showIcons && <Globe className="w-3 h-3 text-slate-400 shrink-0" />}
          <span className="break-all">{personal.portfolio}</span>
        </span>
      )}
    </div>
  );

  // Profile photo element
  const renderPhoto = (sizeClass = 'w-24 h-24') => {
    if (!showPhoto) return null;
    return (
      <div className={`${sizeClass} rounded-xl overflow-hidden border-2 border-slate-200 shadow-xs shrink-0 bg-slate-100`}>
        <img
          src={personal.photoUrl}
          alt={personal.fullName || 'Candidate Photo'}
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  };

  // Check if two-column sidebar layout is enabled
  const hasLeftSidebar =
    customization.showSidebar &&
    (layout === 'two-column-left' || layout === 'sidebar-compact');
  const hasRightSidebar =
    customization.showSidebar &&
    (layout === 'two-column-right' || layout === 'minimal-split');

  return (
    <div
      id="cv-preview-printable"
      className="a4-sheet shadow-xl text-slate-800 antialiased p-8 sm:p-10 font-sans"
      style={{ fontFamily }}
    >
      {/* Visual Page Break Marker (for preview only, hides on print) */}
      <div className="absolute top-[297mm] left-0 right-0 border-b-2 border-dashed border-rose-300 text-[10px] text-rose-500 font-bold px-4 py-0.5 bg-rose-50/60 print:hidden flex items-center justify-between pointer-events-none z-10">
        <span>--- A4 Page 1 End (Print Cutline) ---</span>
        <span>Page 2 Begins Below</span>
      </div>

      {/* HEADER STYLES */}
      {template.headerStyle === 'banner' ? (
        <div
          className="p-6 -mx-8 sm:-mx-10 -mt-8 sm:-mt-10 mb-6 text-white"
          style={{ backgroundColor: primaryColor }}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {personal.fullName || 'Your Full Name'}
              </h1>
              <h2 className="text-sm sm:text-base font-semibold text-white/90 mt-0.5 tracking-wide">
                {personal.professionalTitle || 'Your Professional Title'}
              </h2>
              <div className="text-white/90 text-xs mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {personal.email && <span>{personal.email}</span>}
                {personal.phone && (
                  <span>
                    {personal.phone}
                    {personal.whatsapp && ' (WhatsApp)'}
                  </span>
                )}
                {personal.country && <span>{personal.country}</span>}
                {personal.linkedIn && <span className="break-all">{personal.linkedIn}</span>}
                {personal.github && <span className="break-all">{personal.github}</span>}
                {personal.portfolio && <span className="break-all">{personal.portfolio}</span>}
              </div>
            </div>
            {renderPhoto('w-28 h-28')}
          </div>
        </div>
      ) : template.headerStyle === 'centered' ? (
        <div className="text-center pb-5 mb-5 border-b border-slate-200">
          {renderPhoto('w-24 h-24 mx-auto mb-3')}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            {personal.fullName || 'Your Full Name'}
          </h1>
          <h2 className="text-sm sm:text-base font-semibold mt-0.5" style={{ color: primaryColor }}>
            {personal.professionalTitle || 'Your Professional Title'}
          </h2>
          <div className="flex justify-center">{renderContactInfo(true)}</div>
        </div>
      ) : template.headerStyle === 'accent-stripe' ? (
        <div className="pb-5 mb-5 border-l-4 pl-4" style={{ borderColor: primaryColor }}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {personal.fullName || 'Your Full Name'}
              </h1>
              <h2 className="text-sm sm:text-base font-semibold text-slate-600 mt-0.5">
                {personal.professionalTitle || 'Your Professional Title'}
              </h2>
              {renderContactInfo(true)}
            </div>
            {renderPhoto('w-24 h-24')}
          </div>
        </div>
      ) : (
        /* Clean standard header */
        <div className="pb-5 mb-5 border-b border-slate-200">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                {personal.fullName || 'Your Full Name'}
              </h1>
              <h2 className="text-sm sm:text-base font-semibold mt-0.5" style={{ color: primaryColor }}>
                {personal.professionalTitle || 'Your Professional Title'}
              </h2>
              {renderContactInfo(true)}
            </div>
            {renderPhoto('w-24 h-24')}
          </div>
        </div>
      )}

      {/* BODY LAYOUTS */}
      {hasLeftSidebar ? (
        /* TWO COLUMN - LEFT SIDEBAR */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-4 space-y-4 pr-3 border-r border-slate-200">
            {renderSkills(true)}
            {renderLanguages(true)}
            {renderCertifications(true)}
          </div>
          {/* Main Content */}
          <div className="md:col-span-8 space-y-4">
            {renderSummary()}
            {renderCategoryFields()}
            {renderExperience()}
            {renderProjects()}
            {renderEducation()}
            {renderAwards()}
            {renderReferences()}
          </div>
        </div>
      ) : hasRightSidebar ? (
        /* TWO COLUMN - RIGHT SIDEBAR */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="md:col-span-8 space-y-4">
            {renderSummary()}
            {renderCategoryFields()}
            {renderExperience()}
            {renderProjects()}
            {renderEducation()}
            {renderAwards()}
            {renderReferences()}
          </div>
          {/* Sidebar */}
          <div className="md:col-span-4 space-y-4 pl-3 border-l border-slate-200">
            {renderSkills(true)}
            {renderLanguages(true)}
            {renderCertifications(true)}
          </div>
        </div>
      ) : (
        /* SINGLE COLUMN / ATS-PURE */
        <div className="space-y-4">
          {renderSummary()}
          {renderCategoryFields()}
          {renderExperience()}
          {renderProjects()}
          {renderEducation()}
          {renderSkills()}
          {renderCertifications()}
          {renderLanguages()}
          {renderAwards()}
          {renderReferences()}
        </div>
      )}
    </div>
  );
};
