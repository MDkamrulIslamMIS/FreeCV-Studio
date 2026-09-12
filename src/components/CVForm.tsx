import React, { useState } from 'react';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  Globe,
  Users,
  Code,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  HelpCircle,
  FolderKanban,
  RotateCcw,
} from 'lucide-react';
import { CVData, WorkExperience, Education, SkillItem, Certification, ProjectItem, LanguageItem, AwardItem, ReferenceItem } from '../types';
import { CV_CATEGORIES } from '../data/categories';
import { KAMRUL_PHOTO } from '../data/kamrulPhoto';
import { AdSlot } from './AdSlot';

interface CVFormProps {
  cvData: CVData;
  onChange: (updated: CVData) => void;
  selectedCategoryId: string;
}

export const CVForm: React.FC<CVFormProps> = ({ cvData, onChange, selectedCategoryId }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const activeCategory = CV_CATEGORIES.find((c) => c.id === selectedCategoryId) || CV_CATEGORIES[0];

  const steps = [
    { num: 1, label: 'Personal Info', icon: User },
    { num: 2, label: 'Summary', icon: FileText },
    { num: 3, label: 'Experience', icon: Briefcase },
    { num: 4, label: 'Education', icon: GraduationCap },
    { num: 5, label: 'Skills', icon: Sparkles },
    { num: 6, label: 'Certifications', icon: CheckCircle },
    { num: 7, label: 'Projects', icon: Code },
    { num: 8, label: 'Languages', icon: Globe },
    { num: 9, label: 'Awards', icon: Award },
    { num: 10, label: 'References', icon: Users },
    { num: 11, label: `${activeCategory.name} Specialization`, icon: FolderKanban },
  ];

  // Helper updater
  const updateField = <K extends keyof CVData>(field: K, value: CVData[K]) => {
    onChange({ ...cvData, [field]: value });
  };

  const updatePersonal = (field: keyof CVData['personal'], value: any) => {
    onChange({
      ...cvData,
      personal: { ...cvData.personal, [field]: value },
    });
  };

  // Profile photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2.5 * 1024 * 1024) {
      alert('Photo size exceeds 2.5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      updatePersonal('photoUrl', result);
      updatePersonal('showPhoto', true);
    };
    reader.readAsDataURL(file);
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      responsibilities: '',
      achievements: '',
    };
    updateField('experience', [newExp, ...cvData.experience]);
  };

  const updateExperience = (id: string, key: keyof WorkExperience, val: any) => {
    const updated = cvData.experience.map((exp) => (exp.id === id ? { ...exp, [key]: val } : exp));
    updateField('experience', updated);
  };

  const removeExperience = (id: string) => {
    updateField('experience', cvData.experience.filter((exp) => exp.id !== id));
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      subject: '',
      startYear: '',
      endYear: '',
      result: '',
    };
    updateField('education', [newEdu, ...cvData.education]);
  };

  const updateEducation = (id: string, key: keyof Education, val: any) => {
    const updated = cvData.education.map((edu) => (edu.id === id ? { ...edu, [key]: val } : edu));
    updateField('education', updated);
  };

  const removeEducation = (id: string) => {
    updateField('education', cvData.education.filter((edu) => edu.id !== id));
  };

  // Skill handlers
  const addSkill = () => {
    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      name: '',
      level: 'Intermediate',
    };
    updateField('skills', [...cvData.skills, newSkill]);
  };

  const updateSkill = (id: string, key: keyof SkillItem, val: any) => {
    const updated = cvData.skills.map((sk) => (sk.id === id ? { ...sk, [key]: val } : sk));
    updateField('skills', updated);
  };

  const removeSkill = (id: string) => {
    updateField('skills', cvData.skills.filter((sk) => sk.id !== id));
  };

  // Certification handlers
  const addCert = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      certification: '',
      organization: '',
      date: '',
      credentialId: '',
      link: '',
    };
    updateField('certifications', [...cvData.certifications, newCert]);
  };

  const updateCert = (id: string, key: keyof Certification, val: any) => {
    const updated = cvData.certifications.map((c) => (c.id === id ? { ...c, [key]: val } : c));
    updateField('certifications', updated);
  };

  const removeCert = (id: string) => {
    updateField('certifications', cvData.certifications.filter((c) => c.id !== id));
  };

  // Project handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      projectName: '',
      description: '',
      role: '',
      technologies: '',
      projectLink: '',
    };
    updateField('projects', [...cvData.projects, newProj]);
  };

  const updateProject = (id: string, key: keyof ProjectItem, val: any) => {
    const updated = cvData.projects.map((p) => (p.id === id ? { ...p, [key]: val } : p));
    updateField('projects', updated);
  };

  const removeProject = (id: string) => {
    updateField('projects', cvData.projects.filter((p) => p.id !== id));
  };

  // Language handlers
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Fluent',
    };
    updateField('languages', [...cvData.languages, newLang]);
  };

  const updateLanguage = (id: string, key: keyof LanguageItem, val: any) => {
    const updated = cvData.languages.map((l) => (l.id === id ? { ...l, [key]: val } : l));
    updateField('languages', updated);
  };

  const removeLanguage = (id: string) => {
    updateField('languages', cvData.languages.filter((l) => l.id !== id));
  };

  // Award handlers
  const addAward = () => {
    const newAward: AwardItem = {
      id: `aw-${Date.now()}`,
      award: '',
      organization: '',
      date: '',
      description: '',
    };
    updateField('awards', [...cvData.awards, newAward]);
  };

  const updateAward = (id: string, key: keyof AwardItem, val: any) => {
    const updated = cvData.awards.map((a) => (a.id === id ? { ...a, [key]: val } : a));
    updateField('awards', updated);
  };

  const removeAward = (id: string) => {
    updateField('awards', cvData.awards.filter((a) => a.id !== id));
  };

  // Reference handlers
  const addReference = () => {
    const newRef: ReferenceItem = {
      id: `ref-${Date.now()}`,
      name: '',
      position: '',
      company: '',
      phone: '',
      email: '',
    };
    updateField('references', [...cvData.references, newRef]);
  };

  const updateReference = (id: string, key: keyof ReferenceItem, val: any) => {
    const updated = cvData.references.map((r) => (r.id === id ? { ...r, [key]: val } : r));
    updateField('references', updated);
  };

  const removeReference = (id: string) => {
    updateField('references', cvData.references.filter((r) => r.id !== id));
  };

  // Category custom field handler
  const updateCategoryCustomField = (fieldId: string, val: string) => {
    const updated = { ...cvData.categoryFields, [fieldId]: val };
    updateField('categoryFields', updated);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden print:hidden">
      {/* Top Ad Slot before form */}
      <AdSlot slot="formTop" />

      {/* Horizontal step selector */}
      <div className="border-b border-slate-200 bg-slate-50/70 p-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max px-1">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = activeStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {s.num}. {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Form Body */}
      <div className="p-5 sm:p-6">
        {/* STEP 1: Personal Info */}
        {activeStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" /> Step 1: Personal Information
              </h3>
              <span className="text-xs text-slate-400">Step 1 of 11</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={cvData.personal.fullName}
                  onChange={(e) => updatePersonal('fullName', e.target.value)}
                  placeholder="e.g. Md. Kamrul Islam"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Professional Title *</label>
                <input
                  type="text"
                  value={cvData.personal.professionalTitle}
                  onChange={(e) => updatePersonal('professionalTitle', e.target.value)}
                  placeholder="e.g. Full-Stack Web Developer & PHP Specialist"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={cvData.personal.email}
                  onChange={(e) => updatePersonal('email', e.target.value)}
                  placeholder="e.g. mdkamrulislamnakir@gmail.com"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={cvData.personal.phone}
                  onChange={(e) => updatePersonal('phone', e.target.value)}
                  placeholder="e.g. 01810811417"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">WhatsApp Number</label>
                  {cvData.personal.phone && (
                    <button
                      type="button"
                      onClick={() => updatePersonal('whatsapp', cvData.personal.phone)}
                      className="text-[10px] text-blue-600 hover:text-blue-800 font-semibold underline"
                    >
                      Same as phone
                    </button>
                  )}
                </div>
                <input
                  type="tel"
                  value={cvData.personal.whatsapp || ''}
                  onChange={(e) => updatePersonal('whatsapp', e.target.value)}
                  placeholder="e.g. 01810811417 (Active on WhatsApp)"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={cvData.personal.address}
                  onChange={(e) => updatePersonal('address', e.target.value)}
                  placeholder="e.g. Dhaka"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City, State / Country</label>
                <input
                  type="text"
                  value={cvData.personal.country}
                  onChange={(e) => updatePersonal('country', e.target.value)}
                  placeholder="e.g. Dhaka, Bangladesh"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={cvData.personal.dateOfBirth}
                  onChange={(e) => updatePersonal('dateOfBirth', e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nationality</label>
                <input
                  type="text"
                  value={cvData.personal.nationality}
                  onChange={(e) => updatePersonal('nationality', e.target.value)}
                  placeholder="e.g. Bangladeshi"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  value={cvData.personal.linkedIn}
                  onChange={(e) => updatePersonal('linkedIn', e.target.value)}
                  placeholder="https://www.linkedin.com/in/md-kamrul-islam1997"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">GitHub Profile</label>
                <input
                  type="text"
                  value={cvData.personal.github || ''}
                  onChange={(e) => updatePersonal('github', e.target.value)}
                  placeholder="https://github.com/MDkamrulIslamMIS"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio / Website / Blog</label>
                <input
                  type="text"
                  value={cvData.personal.portfolio}
                  onChange={(e) => updatePersonal('portfolio', e.target.value)}
                  placeholder="https://alltechacademybd.blogspot.com/"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Photo Upload Section */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700">Profile Photo</label>
                {cvData.personal.photoUrl !== KAMRUL_PHOTO && (
                  <button
                    type="button"
                    onClick={() => {
                      updatePersonal('photoUrl', KAMRUL_PHOTO);
                      updatePersonal('showPhoto', true);
                    }}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Restore Kamrul's Photo
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                {cvData.personal.photoUrl ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-slate-300 relative group bg-slate-100 shrink-0 shadow-xs">
                    <img
                      src={cvData.personal.photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 shrink-0">
                    <User className="w-6 h-6" />
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  <label className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 transition-colors">
                    <Upload className="w-3.5 h-3.5" /> Upload New Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {cvData.personal.photoUrl && (
                    <>
                      <button
                        onClick={() => updatePersonal('showPhoto', !cvData.personal.showPhoto)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                          cvData.personal.showPhoto
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        {cvData.personal.showPhoto ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {cvData.personal.showPhoto ? 'Photo Visible' : 'Photo Hidden'}
                      </button>

                      <button
                        onClick={() => {
                          updatePersonal('photoUrl', '');
                          updatePersonal('showPhoto', false);
                        }}
                        className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Summary */}
        {activeStep === 2 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" /> Step 2: Professional Summary & Objective
              </h3>
              <span className="text-xs text-slate-400">Step 2 of 11</span>
            </div>

            {/* Mode selection toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Section Type to Display:</label>
              <div className="flex gap-2">
                {(['summary', 'objective', 'both'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => updateField('summaryType', type)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors capitalize ${
                      cvData.summaryType === type
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {type === 'both' ? 'Both Summary & Objective' : type}
                  </button>
                ))}
              </div>
            </div>

            {(cvData.summaryType === 'summary' || cvData.summaryType === 'both') && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Professional Summary
                </label>
                <textarea
                  rows={4}
                  value={cvData.professionalSummary}
                  onChange={(e) => updateField('professionalSummary', e.target.value)}
                  placeholder="3-4 sentences summarizing your career achievements, core strengths, and industry experience..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white leading-relaxed"
                />
              </div>
            )}

            {(cvData.summaryType === 'objective' || cvData.summaryType === 'both') && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Career Objective</label>
                <textarea
                  rows={3}
                  value={cvData.careerObjective}
                  onChange={(e) => updateField('careerObjective', e.target.value)}
                  placeholder="State your prospective career goal, target role, and the impact you aim to deliver to an employer..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white leading-relaxed"
                />
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Work Experience */}
        {activeStep === 3 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" /> Step 3: Work Experience
              </h3>
              <button
                onClick={addExperience}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Experience
              </button>
            </div>

            {cvData.experience.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
                <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">No work experience entries added yet.</p>
                <button
                  onClick={addExperience}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                >
                  + Add First Job Experience
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cvData.experience.map((exp, index) => (
                  <div
                    key={exp.id}
                    className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Experience #{index + 1}</span>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Job Title *</label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                          placeholder="e.g. Senior Merchandiser"
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Company *</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          placeholder="e.g. Apex Global Sourcing"
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                          placeholder="e.g. New York, NY"
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-600 mb-1">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            placeholder="e.g. 2021-03"
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-slate-600 mb-1">End Date</label>
                          <input
                            type="text"
                            disabled={exp.currentlyWorking}
                            value={exp.currentlyWorking ? 'Present' : exp.endDate}
                            onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                            placeholder="e.g. 2023-10"
                            className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md disabled:bg-slate-100 disabled:text-slate-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id={`curr-${exp.id}`}
                        checked={exp.currentlyWorking}
                        onChange={(e) => updateExperience(exp.id, 'currentlyWorking', e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`curr-${exp.id}`} className="text-xs text-slate-700 font-medium">
                        I am currently working in this role
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Responsibilities</label>
                      <textarea
                        rows={3}
                        value={exp.responsibilities}
                        onChange={(e) => updateExperience(exp.id, 'responsibilities', e.target.value)}
                        placeholder="Bullet points or short paragraphs detailing day-to-day duties and leadership scope..."
                        className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Key Achievements & Milestones</label>
                      <input
                        type="text"
                        value={exp.achievements}
                        onChange={(e) => updateExperience(exp.id, 'achievements', e.target.value)}
                        placeholder="e.g. Reduced shipment turnaround by 18%; generated $4.5M in annual repeat revenue"
                        className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Education */}
        {activeStep === 4 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" /> Step 4: Education
              </h3>
              <button
                onClick={addEducation}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Education
              </button>
            </div>

            {cvData.education.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
                <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">No education entries added yet.</p>
                <button
                  onClick={addEducation}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                >
                  + Add Degree / Qualification
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cvData.education.map((edu, index) => (
                  <div key={edu.id} className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Education #{index + 1}</span>
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Degree / Qualification *</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="e.g. Bachelor of Science in Computer Science"
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Institution / University *</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                          placeholder="e.g. State University of New York"
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Major / Subject</label>
                        <input
                          type="text"
                          value={edu.subject}
                          onChange={(e) => updateEducation(edu.id, 'subject', e.target.value)}
                          placeholder="e.g. Software Systems & Database Design"
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Result / GPA / Honors</label>
                        <input
                          type="text"
                          value={edu.result}
                          onChange={(e) => updateEducation(edu.id, 'result', e.target.value)}
                          placeholder="e.g. GPA 3.9 / First Class Honors"
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Start Year</label>
                        <input
                          type="text"
                          value={edu.startYear}
                          onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                          placeholder="e.g. 2018"
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Graduation / End Year</label>
                        <input
                          type="text"
                          value={edu.endYear}
                          onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                          placeholder="e.g. 2022"
                          className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 5: Skills */}
        {activeStep === 5 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" /> Step 5: Skills & Competencies
              </h3>
              <button
                onClick={addSkill}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cvData.skills.map((sk) => (
                <div key={sk.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                  <input
                    type="text"
                    value={sk.name}
                    onChange={(e) => updateSkill(sk.id, 'name', e.target.value)}
                    placeholder="e.g. React.js, Cost Accounting, CAD"
                    className="flex-1 text-xs p-2 bg-white border border-slate-300 rounded-md"
                  />
                  <select
                    value={sk.level}
                    onChange={(e) => updateSkill(sk.id, 'level', e.target.value as any)}
                    className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <button
                    onClick={() => removeSkill(sk.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: Certifications */}
        {activeStep === 6 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" /> Step 6: Certifications & Licenses
              </h3>
              <button
                onClick={addCert}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Certification
              </button>
            </div>

            <div className="space-y-3">
              {cvData.certifications.map((cert) => (
                <div key={cert.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Certification Record</span>
                    <button onClick={() => removeCert(cert.id)} className="text-rose-500 hover:text-rose-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={cert.certification}
                      onChange={(e) => updateCert(cert.id, 'certification', e.target.value)}
                      placeholder="Certification Name (e.g. AWS Solutions Architect)"
                      className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={cert.organization}
                      onChange={(e) => updateCert(cert.id, 'organization', e.target.value)}
                      placeholder="Issuing Organization (e.g. Amazon Web Services)"
                      className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={cert.date}
                      onChange={(e) => updateCert(cert.id, 'date', e.target.value)}
                      placeholder="Issue Date (e.g. 2023)"
                      className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={cert.credentialId}
                      onChange={(e) => updateCert(cert.id, 'credentialId', e.target.value)}
                      placeholder="Credential ID / Verification Code"
                      className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7: Projects */}
        {activeStep === 7 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-600" /> Step 7: Projects & Case Studies
              </h3>
              <button
                onClick={addProject}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Project
              </button>
            </div>

            <div className="space-y-3">
              {cvData.projects.map((proj) => (
                <div key={proj.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Project Details</span>
                    <button onClick={() => removeProject(proj.id)} className="text-rose-500 hover:text-rose-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={proj.projectName}
                      onChange={(e) => updateProject(proj.id, 'projectName', e.target.value)}
                      placeholder="Project Title"
                      className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={proj.role}
                      onChange={(e) => updateProject(proj.id, 'role', e.target.value)}
                      placeholder="Your Role (e.g. Lead Architect)"
                      className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={proj.technologies}
                      onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                      placeholder="Technologies / Tools Used"
                      className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                    />
                    <input
                      type="text"
                      value={proj.projectLink}
                      onChange={(e) => updateProject(proj.id, 'projectLink', e.target.value)}
                      placeholder="Project URL / GitHub Link"
                      className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    placeholder="Brief description of the challenge, technical implementation, and quantifiable results achieved..."
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 8: Languages */}
        {activeStep === 8 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" /> Step 8: Languages
              </h3>
              <button
                onClick={addLanguage}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Language
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cvData.languages.map((l) => (
                <div key={l.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                  <input
                    type="text"
                    value={l.language}
                    onChange={(e) => updateLanguage(l.id, 'language', e.target.value)}
                    placeholder="e.g. English, Spanish, German"
                    className="flex-1 text-xs p-2 bg-white border border-slate-300 rounded-md"
                  />
                  <select
                    value={l.proficiency}
                    onChange={(e) => updateLanguage(l.id, 'proficiency', e.target.value as any)}
                    className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                  </select>
                  <button onClick={() => removeLanguage(l.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 9: Awards */}
        {activeStep === 9 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" /> Step 9: Awards & Honors
              </h3>
              <button
                onClick={addAward}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Award
              </button>
            </div>

            <div className="space-y-3">
              {cvData.awards.map((aw) => (
                <div key={aw.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Award Entry</span>
                    <button onClick={() => removeAward(aw.id)} className="text-rose-500 hover:text-rose-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={aw.award}
                      onChange={(e) => updateAward(aw.id, 'award', e.target.value)}
                      placeholder="Award Title (e.g. Employee of the Year)"
                      className="text-xs p-2 bg-white border border-slate-300 rounded-md sm:col-span-2"
                    />
                    <input
                      type="text"
                      value={aw.date}
                      onChange={(e) => updateAward(aw.id, 'date', e.target.value)}
                      placeholder="Year / Date"
                      className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    value={aw.organization}
                    onChange={(e) => updateAward(aw.id, 'organization', e.target.value)}
                    placeholder="Granting Organization / Company"
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                  />
                  <input
                    type="text"
                    value={aw.description}
                    onChange={(e) => updateAward(aw.id, 'description', e.target.value)}
                    placeholder="Optional short description of why this honor was presented"
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 10: References */}
        {activeStep === 10 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> Step 10: Professional References
              </h3>
              <button
                onClick={addReference}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Reference
              </button>
            </div>

            {/* Do not show references toggle */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-slate-800">Show References on Resume</span>
                <p className="text-[11px] text-slate-500">
                  When toggled off, shows "References available upon request" to protect contacts.
                </p>
              </div>
              <input
                type="checkbox"
                checked={cvData.showReferences}
                onChange={(e) => updateField('showReferences', e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </div>

            {cvData.showReferences && (
              <div className="space-y-3">
                {cvData.references.map((ref) => (
                  <div key={ref.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Reference Contact</span>
                      <button onClick={() => removeReference(ref.id)} className="text-rose-500 hover:text-rose-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={ref.name}
                        onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                        placeholder="Referee Full Name"
                        className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={ref.position}
                        onChange={(e) => updateReference(ref.id, 'position', e.target.value)}
                        placeholder="Title / Designation"
                        className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={ref.company}
                        onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                        placeholder="Company / Institution"
                        className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                      />
                      <input
                        type="tel"
                        value={ref.phone}
                        onChange={(e) => updateReference(ref.id, 'phone', e.target.value)}
                        placeholder="Phone Number"
                        className="text-xs p-2 bg-white border border-slate-300 rounded-md"
                      />
                      <input
                        type="email"
                        value={ref.email}
                        onChange={(e) => updateReference(ref.id, 'email', e.target.value)}
                        placeholder="Email Address"
                        className="text-xs p-2 bg-white border border-slate-300 rounded-md sm:col-span-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STEP 11: Category-Specific Custom Fields */}
        {activeStep === 11 && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <FolderKanban className="w-4 h-4 text-blue-600" /> Step 11: {activeCategory.name} Specialization
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeCategory.tagline}</p>
              </div>
              <span className="text-xs text-slate-400">Step 11 of 11</span>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Recruiter Priorities for {activeCategory.name}:</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {activeCategory.recruiterFocus.map((f, i) => (
                    <span key={i} className="px-2 py-0.5 bg-white/90 border border-blue-200 rounded text-[10.5px] font-medium text-blue-800">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3.5">
              {activeCategory.customFields.map((field) => {
                const val = cvData.categoryFields?.[field.id] || '';
                return (
                  <div key={field.id} className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800">{field.label}</label>
                    {field.type === 'textarea' ? (
                      <textarea
                        rows={3}
                        value={val}
                        onChange={(e) => updateCategoryCustomField(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => updateCategoryCustomField(field.id, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Form Middle Ad Slot */}
        <AdSlot slot="formMiddle" />

        {/* Step Navigation Footer */}
        <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            disabled={activeStep === 1}
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Step
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Step {activeStep} of {steps.length}
          </span>

          <button
            disabled={activeStep === steps.length}
            onClick={() => setActiveStep((prev) => Math.min(steps.length, prev + 1))}
            className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            Next Step <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
