export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string;
  achievements: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  subject: string;
  startYear: string;
  endYear: string;
  result: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Certification {
  id: string;
  certification: string;
  organization: string;
  date: string;
  credentialId: string;
  link: string;
}

export interface ProjectItem {
  id: string;
  projectName: string;
  description: string;
  role: string;
  technologies: string;
  projectLink: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
}

export interface AwardItem {
  id: string;
  award: string;
  organization: string;
  date: string;
  description: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
}

export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  phone: string;
  whatsapp?: string;
  email: string;
  address: string;
  country: string;
  dateOfBirth: string;
  nationality: string;
  linkedIn: string;
  github?: string;
  portfolio: string;
  photoUrl: string;
  showPhoto: boolean;
}

export interface CVData {
  personal: PersonalInfo;
  summaryType: 'summary' | 'objective' | 'both';
  professionalSummary: string;
  careerObjective: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillItem[];
  certifications: Certification[];
  projects: ProjectItem[];
  languages: LanguageItem[];
  awards: AwardItem[];
  references: ReferenceItem[];
  showReferences: boolean;
  categoryFields: Record<string, string>;
}

export interface CategoryFieldDef {
  id: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'tags';
  description?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  recruiterFocus: string[];
  customFields: CategoryFieldDef[];
}

export type TemplateStyle =
  | 'Modern'
  | 'Classic'
  | 'Minimal'
  | 'Corporate'
  | 'Executive'
  | 'ATS-friendly'
  | 'Creative'
  | 'Elegant'
  | 'Professional'
  | 'Clean'
  | 'Two-column'
  | 'Single-column'
  | 'Timeline'
  | 'Sidebar'
  | 'Compact'
  | 'Academic'
  | 'Technical'
  | 'Leadership'
  | 'Premium-style'
  | 'Simple professional';

export type LayoutType =
  | 'single-column'
  | 'two-column-left'
  | 'two-column-right'
  | 'sidebar-compact'
  | 'timeline'
  | 'header-card'
  | 'ats-pure'
  | 'minimal-split';

export type HeaderStyle =
  | 'clean'
  | 'centered'
  | 'banner'
  | 'boxed'
  | 'compact'
  | 'accent-stripe'
  | 'split';

export interface CVTemplate {
  id: string;
  categoryId: string;
  name: string;
  style: TemplateStyle;
  bestSuitedFor: string;
  layoutType: LayoutType;
  headerStyle: HeaderStyle;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  isATS: boolean;
  hasPhoto: boolean;
  sidebarPosition?: 'left' | 'right' | 'none';
  sectionOrder: string[];
}

export interface AdConfig {
  header: string;
  categoryTop: string;
  categoryMiddle: string;
  templateList: string;
  formTop: string;
  formMiddle: string;
  previewTop: string;
  downloadArea: string;
  footer: string;
  mobileSticky: string;
}

export interface StyleCustomization {
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  headingSize: 'small' | 'medium' | 'large';
  lineSpacing: 'tight' | 'normal' | 'relaxed';
  sectionSpacing: 'compact' | 'standard' | 'generous';
  primaryColor: string;
  accentColor: string;
  showPhoto: boolean;
  showIcons: boolean;
  showSidebar: boolean;
}

export interface SectionItem {
  id: string;
  name: string;
  visible: boolean;
}
