import { CVTemplate, TemplateStyle, LayoutType, HeaderStyle } from '../types';
import { CV_CATEGORIES } from './categories';

// 20 Archetype specifications providing varied layouts, styles, fonts, and colors
interface TemplateArchetype {
  suffix: string;
  style: TemplateStyle;
  layoutType: LayoutType;
  headerStyle: HeaderStyle;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  isATS: boolean;
  hasPhoto: boolean;
  sidebarPosition: 'left' | 'right' | 'none';
  namingPattern: (catName: string) => string;
  bestSuitedPattern: (catName: string) => string;
  sectionOrder: string[];
}

const TEMPLATE_ARCHETYPES: TemplateArchetype[] = [
  {
    suffix: '01',
    style: 'Modern',
    layoutType: 'two-column-left',
    headerStyle: 'clean',
    primaryColor: '#1e3a8a', // Navy
    accentColor: '#3b82f6',
    fontFamily: 'Plus Jakarta Sans',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'left',
    namingPattern: (cat) => `Modern ${cat} Elite`,
    bestSuitedPattern: (cat) => `Fast-paced corporate roles & contemporary ${cat} positions`,
    sectionOrder: ['personal', 'categoryFields', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'awards', 'references'],
  },
  {
    suffix: '02',
    style: 'Classic',
    layoutType: 'single-column',
    headerStyle: 'centered',
    primaryColor: '#1f2937', // Charcoal
    accentColor: '#4b5563',
    fontFamily: 'EB Garamond',
    isATS: true,
    hasPhoto: false,
    sidebarPosition: 'none',
    namingPattern: (cat) => `Classic ${cat} Heritage`,
    bestSuitedPattern: (cat) => `Traditional firms, government, and conservative ${cat} employers`,
    sectionOrder: ['personal', 'summary', 'categoryFields', 'experience', 'education', 'certifications', 'skills', 'projects', 'awards', 'languages', 'references'],
  },
  {
    suffix: '03',
    style: 'Minimal',
    layoutType: 'single-column',
    headerStyle: 'split',
    primaryColor: '#0f172a', // Slate 900
    accentColor: '#64748b',
    fontFamily: 'Inter',
    isATS: true,
    hasPhoto: false,
    sidebarPosition: 'none',
    namingPattern: (cat) => `Minimalist ${cat} Pure`,
    bestSuitedPattern: (cat) => `Candidates seeking ultra-clean, clutter-free presentation`,
    sectionOrder: ['personal', 'summary', 'experience', 'categoryFields', 'education', 'skills', 'certifications', 'projects', 'languages', 'awards', 'references'],
  },
  {
    suffix: '04',
    style: 'Corporate',
    layoutType: 'two-column-right',
    headerStyle: 'banner',
    primaryColor: '#0369a1', // Corporate Sky Blue
    accentColor: '#0284c7',
    fontFamily: 'Outfit',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'right',
    namingPattern: (cat) => `Corporate ${cat} Standard`,
    bestSuitedPattern: (cat) => `Multinational enterprises and corporate tier 1 employers`,
    sectionOrder: ['personal', 'categoryFields', 'summary', 'experience', 'projects', 'education', 'skills', 'certifications', 'languages', 'awards', 'references'],
  },
  {
    suffix: '05',
    style: 'Executive',
    layoutType: 'header-card',
    headerStyle: 'accent-stripe',
    primaryColor: '#312e81', // Indigo Deep
    accentColor: '#4f46e5',
    fontFamily: 'Playfair Display',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'none',
    namingPattern: (cat) => `Executive ${cat} Pinnacle`,
    bestSuitedPattern: (cat) => `Senior leadership, directors, and authoritative specialists`,
    sectionOrder: ['personal', 'summary', 'categoryFields', 'experience', 'education', 'skills', 'projects', 'certifications', 'awards', 'languages', 'references'],
  },
  {
    suffix: '06',
    style: 'ATS-friendly',
    layoutType: 'ats-pure',
    headerStyle: 'clean',
    primaryColor: '#111827', // Black / Dark Slate
    accentColor: '#374151',
    fontFamily: 'Roboto Flex',
    isATS: true,
    hasPhoto: false,
    sidebarPosition: 'none',
    namingPattern: (cat) => `ATS Pro ${cat} Certified`,
    bestSuitedPattern: (cat) => `Large enterprise job portals using automated ATS scanners`,
    sectionOrder: ['personal', 'summary', 'categoryFields', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages', 'awards', 'references'],
  },
  {
    suffix: '07',
    style: 'Creative',
    layoutType: 'sidebar-compact',
    headerStyle: 'boxed',
    primaryColor: '#0f766e', // Teal
    accentColor: '#14b8a6',
    fontFamily: 'Outfit',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'left',
    namingPattern: (cat) => `Creative ${cat} Edge`,
    bestSuitedPattern: (cat) => `Agencies, innovative studios, and modern collaborative brands`,
    sectionOrder: ['personal', 'categoryFields', 'summary', 'skills', 'experience', 'projects', 'education', 'languages', 'certifications', 'awards', 'references'],
  },
  {
    suffix: '08',
    style: 'Elegant',
    layoutType: 'two-column-left',
    headerStyle: 'centered',
    primaryColor: '#881337', // Rose / Burgundy
    accentColor: '#be123c',
    fontFamily: 'Lora',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'left',
    namingPattern: (cat) => `Elegant ${cat} Signature`,
    bestSuitedPattern: (cat) => `High-end advisory, luxury, academic, and bespoke positions`,
    sectionOrder: ['personal', 'summary', 'categoryFields', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages', 'awards', 'references'],
  },
  {
    suffix: '09',
    style: 'Professional',
    layoutType: 'single-column',
    headerStyle: 'clean',
    primaryColor: '#1e293b', // Slate
    accentColor: '#2563eb',
    fontFamily: 'Plus Jakarta Sans',
    isATS: true,
    hasPhoto: false,
    sidebarPosition: 'none',
    namingPattern: (cat) => `Universal ${cat} Pro`,
    bestSuitedPattern: (cat) => `All-round standard professional applications worldwide`,
    sectionOrder: ['personal', 'summary', 'categoryFields', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'awards', 'references'],
  },
  {
    suffix: '10',
    style: 'Clean',
    layoutType: 'minimal-split',
    headerStyle: 'split',
    primaryColor: '#15803d', // Emerald
    accentColor: '#22c55e',
    fontFamily: 'Inter',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'right',
    namingPattern: (cat) => `Clean Slate ${cat}`,
    bestSuitedPattern: (cat) => `Fresh, approachable, and balanced career portfolios`,
    sectionOrder: ['personal', 'summary', 'categoryFields', 'experience', 'projects', 'education', 'skills', 'certifications', 'languages', 'awards', 'references'],
  },
  {
    suffix: '11',
    style: 'Two-column',
    layoutType: 'two-column-left',
    headerStyle: 'banner',
    primaryColor: '#047857', // Forest
    accentColor: '#10b981',
    fontFamily: 'Plus Jakarta Sans',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'left',
    namingPattern: (cat) => `Dual-Column ${cat} Focus`,
    bestSuitedPattern: (cat) => `Candidates needing dense skill summaries alongside chronology`,
    sectionOrder: ['personal', 'categoryFields', 'skills', 'languages', 'summary', 'experience', 'education', 'projects', 'certifications', 'awards', 'references'],
  },
  {
    suffix: '12',
    style: 'Single-column',
    layoutType: 'single-column',
    headerStyle: 'accent-stripe',
    primaryColor: '#334155', // Slate Dark
    accentColor: '#0ea5e9',
    fontFamily: 'Merriweather',
    isATS: true,
    hasPhoto: false,
    sidebarPosition: 'none',
    namingPattern: (cat) => `Linear ${cat} Chronicle`,
    bestSuitedPattern: (cat) => `Step-by-step career path with strong narrative depth`,
    sectionOrder: ['personal', 'summary', 'experience', 'categoryFields', 'education', 'projects', 'skills', 'certifications', 'languages', 'awards', 'references'],
  },
  {
    suffix: '13',
    style: 'Timeline',
    layoutType: 'timeline',
    headerStyle: 'clean',
    primaryColor: '#1d4ed8', // Bold Blue
    accentColor: '#60a5fa',
    fontFamily: 'Inter',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'none',
    namingPattern: (cat) => `Timeline ${cat} Roadmap`,
    bestSuitedPattern: (cat) => `Chronological career progression and project deliverables`,
    sectionOrder: ['personal', 'summary', 'categoryFields', 'experience', 'education', 'projects', 'skills', 'certifications', 'languages', 'awards', 'references'],
  },
  {
    suffix: '14',
    style: 'Sidebar',
    layoutType: 'two-column-left',
    headerStyle: 'boxed',
    primaryColor: '#111827', // Slate Black
    accentColor: '#f59e0b', // Amber
    fontFamily: 'Outfit',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'left',
    namingPattern: (cat) => `Bold Sidebar ${cat}`,
    bestSuitedPattern: (cat) => `Prominent contact, software stack, and credentials bar`,
    sectionOrder: ['personal', 'categoryFields', 'skills', 'languages', 'certifications', 'summary', 'experience', 'education', 'projects', 'awards', 'references'],
  },
  {
    suffix: '15',
    style: 'Compact',
    layoutType: 'sidebar-compact',
    headerStyle: 'compact',
    primaryColor: '#374151', // Gray 700
    accentColor: '#6b7280',
    fontFamily: 'Inter',
    isATS: true,
    hasPhoto: false,
    sidebarPosition: 'right',
    namingPattern: (cat) => `Compact Single-Page ${cat}`,
    bestSuitedPattern: (cat) => `High-density one-page resume without clutter`,
    sectionOrder: ['personal', 'summary', 'categoryFields', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'awards', 'references'],
  },
  {
    suffix: '16',
    style: 'Academic',
    layoutType: 'single-column',
    headerStyle: 'centered',
    primaryColor: '#451a03', // Warm Deep Amber/Brown
    accentColor: '#b45309',
    fontFamily: 'EB Garamond',
    isATS: true,
    hasPhoto: false,
    sidebarPosition: 'none',
    namingPattern: (cat) => `Scholar ${cat} Vitae`,
    bestSuitedPattern: (cat) => `Institutes, higher education, research, and publications`,
    sectionOrder: ['personal', 'summary', 'education', 'categoryFields', 'experience', 'projects', 'certifications', 'awards', 'skills', 'languages', 'references'],
  },
  {
    suffix: '17',
    style: 'Technical',
    layoutType: 'two-column-right',
    headerStyle: 'clean',
    primaryColor: '#09090b', // Zinc
    accentColor: '#10b981', // Emerald tech
    fontFamily: 'JetBrains Mono',
    isATS: false,
    hasPhoto: false,
    sidebarPosition: 'right',
    namingPattern: (cat) => `Technical Matrix ${cat}`,
    bestSuitedPattern: (cat) => `Tools, frameworks, metrics, and architecture specifications`,
    sectionOrder: ['personal', 'categoryFields', 'summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'languages', 'awards', 'references'],
  },
  {
    suffix: '18',
    style: 'Leadership',
    layoutType: 'header-card',
    headerStyle: 'banner',
    primaryColor: '#1e1b4b', // Midnight Indigo
    accentColor: '#f59e0b', // Gold Accent
    fontFamily: 'Cinzel',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'none',
    namingPattern: (cat) => `Leadership Apex ${cat}`,
    bestSuitedPattern: (cat) => `Management leads, division heads, and board advisors`,
    sectionOrder: ['personal', 'summary', 'categoryFields', 'experience', 'education', 'skills', 'projects', 'awards', 'certifications', 'languages', 'references'],
  },
  {
    suffix: '19',
    style: 'Premium-style',
    layoutType: 'two-column-left',
    headerStyle: 'split',
    primaryColor: '#18181b', // Luxe Zinc
    accentColor: '#d97706', // Luxe Bronze
    fontFamily: 'Playfair Display',
    isATS: false,
    hasPhoto: true,
    sidebarPosition: 'left',
    namingPattern: (cat) => `Premium Bespoke ${cat}`,
    bestSuitedPattern: (cat) => `High-touch executive positions, consulting, and prestigious firms`,
    sectionOrder: ['personal', 'categoryFields', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'awards', 'languages', 'references'],
  },
  {
    suffix: '20',
    style: 'Simple professional',
    layoutType: 'single-column',
    headerStyle: 'clean',
    primaryColor: '#27272a', // Neutral Dark
    accentColor: '#52525b',
    fontFamily: 'Roboto Flex',
    isATS: true,
    hasPhoto: false,
    sidebarPosition: 'none',
    namingPattern: (cat) => `Straightforward ${cat}`,
    bestSuitedPattern: (cat) => `Clean, honest, and direct presentation for immediate hire`,
    sectionOrder: ['personal', 'summary', 'categoryFields', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages', 'awards', 'references'],
  },
];

// Profession-specific custom template names for true distinction across all 400 entries
const CATEGORY_CUSTOM_NAMES: Record<string, string[]> = {
  'merchandiser': [
    'Apparel Sourcing Director', 'Global Buyer Liaison', 'Woven Production Specialist', 'Knitwear Account Executive',
    'Denim Merchandiser Pro', 'TNA Time & Action Lead', 'Garment Costing Strategist', 'Fast-Fashion Flow Manager',
    'Factory Liaison Consultant', 'Export Compliance Merchant', 'FOB Order Orchestrator', 'Textile Supply Specialist',
    'Retail Inventory Merchandiser', 'Offshore Sourcing Officer', 'Fabric Development Manager', 'Garment Sample Coordinator',
    'Apparel ERP Operations', 'Buying House Senior Merchant', 'Sustainable Sourcing Lead', 'Commercial Garment Lead'
  ],
  'student': [
    'University Honors Scholar', 'Freshman Foundation CV', 'Dean’s List Undergraduate', 'Campus Club Leader',
    'STEM Research Assistant', 'Pre-Law Academic Vitae', 'Pre-Med Student Resume', 'Business Student Capstone',
    'High School Valedictorian', 'Study Abroad Explorer', 'Student Athlete Balance', 'Polytechnic Diploma Scholar',
    'Undergrad Intern Candidate', 'Liberal Arts Scholar', 'Peer Tutor & Mentor', 'Campus Ambassador CV',
    'Graduate School Applicant', 'Fellowship Scholar', 'Community Volunteer Scholar', 'First-Gen Student Pioneer'
  ],
  'fresh-graduate': [
    'Entry-Level Trainee Pro', 'Bachelor of Science Graduate', 'BBA Corporate Trainee', 'Junior Software Engineer',
    'Graduate Management Trainee', 'Associate Business Analyst', 'Junior Marketing Associate', 'Engineering Graduate EIT',
    'Creative Arts Graduate', 'Biotech Research Trainee', 'Finance Graduate Analyst', 'HR Trainee Specialist',
    'Communications Associate', 'Supply Chain Trainee', 'Economics Graduate', 'Data Science Entry Fellow',
    'Architecture Junior Apprentice', 'Psychology Research Associate', 'Hospitality Management Graduate', 'New Grad Career Starter'
  ],
  'it-software': [
    'Full-Stack Cloud Architect', 'TypeScript & React Lead', 'Backend Go / Rust Engineer', 'DevOps & Kubernetes SRE',
    'Mobile iOS / Swift Developer', 'Android Kotlin Specialist', 'AI & Machine Learning Engineer', 'Systems Software Engineer',
    'Frontend UI/UX Technologist', 'Database & Data Engineer', 'API Platform Engineer', 'Cybersecurity Specialist',
    'Python Django Architect', 'Java Spring Boot Senior', 'Microservices Specialist', 'QA Automation Engineer',
    'Embedded Firmware Developer', 'Open Source Contributor', 'Tech Lead & Mentor', 'Software Craftsmanship ATS'
  ],
  'accountant': [
    'Certified Public Accountant (CPA)', 'Senior Financial Auditor', 'Tax Strategy Specialist', 'Corporate Controller',
    'QuickBooks / Xero ProAdvisor', 'Management Accountant (CMA)', 'GAAP & IFRS Reporting Lead', 'Cost Accounting Specialist',
    'Payroll & Compliance Manager', 'Forensic Accounting Expert', 'Accounts Payable / Receivable Lead', 'Internal Controls Specialist',
    'Budget & Forecast Analyst', 'Treasury & Cash Flow Manager', 'Enterprise ERP Accountant', 'Public Accounting Staff',
    'Statutory Audit Consultant', 'Small Business Bookkeeper', 'Financial Statement Specialist', 'Ledger & Reconciliation Lead'
  ],
  'teacher-education': [
    'Senior High School Educator', 'Elementary Pedagogy Lead', 'STEM Curriculum Designer', 'AP Calculus & Physics Faculty',
    'Special Education (SPED) Lead', 'English Literature Instructor', 'Early Childhood Educator', 'Bilingual Immersion Teacher',
    'EdTech Classroom Innovator', 'University Adjunct Lecturer', 'Montessori Certified Teacher', 'Music & Fine Arts Educator',
    'Physical Education Director', 'History & Social Studies Lead', 'Instructional Coach & Mentor', 'Academic Counselor',
    'International Baccalaureate (IB) Lead', 'School Department Chair', 'Language Immersion Specialist', 'Pedagogical Excellence ATS'
  ],
  'graphic-designer': [
    'Visual Identity & Brand Lead', 'Senior UI/UX & Product Designer', 'Editorial Layout Specialist', 'Packaging & 3D Visualizer',
    'Creative Art Director', 'Typography & Vector Artist', 'Digital Motion Designer', 'Brand Guidelines Architect',
    'Marketing Collateral Designer', 'Illustrator & Concept Artist', 'Design Systems Engineer', 'Print & Pre-Press Specialist',
    'Interactive Web Designer', 'Logo & Iconography Lead', 'Creative Studio Specialist', 'Advertising Agency Creative',
    'Social Media Visual Strategist', 'Exhibition & Signage Designer', 'Portfolio Showcase Minimal', 'Visual Storyteller Executive'
  ],
  'manager-executive': [
    'Chief Executive Officer (CEO)', 'Chief Operating Officer (COO)', 'Vice President of Operations', 'General Manager (GM)',
    'Global Managing Director', 'Enterprise Business Transformation', 'Division President', 'Chief Strategy Officer',
    'Corporate Operations Director', 'Board Advisor & Executive', 'M&A & Private Equity Director', 'Strategic Growth Officer',
    'Regional Vice President', 'Commercial Operations Head', 'Non-Profit Executive Director', 'Interim Executive Leader',
    'Change Management Director', 'Scale-up General Manager', 'P&L Stewardship Executive', 'Apex Enterprise Leader'
  ]
};

// Generate the complete array of 400 templates (20 categories × 20 templates)
export const ALL_TEMPLATES: CVTemplate[] = CV_CATEGORIES.flatMap((category) => {
  const customNames = CATEGORY_CUSTOM_NAMES[category.id] || [];

  return TEMPLATE_ARCHETYPES.map((arch, index) => {
    const templateId = `${category.id}-${arch.suffix}`;
    const distinctName = customNames[index] || arch.namingPattern(category.name);
    const bestSuited = arch.bestSuitedPattern(category.name);

    return {
      id: templateId,
      categoryId: category.id,
      name: distinctName,
      style: arch.style,
      bestSuitedFor: bestSuited,
      layoutType: arch.layoutType,
      headerStyle: arch.headerStyle,
      primaryColor: arch.primaryColor,
      accentColor: arch.accentColor,
      fontFamily: arch.fontFamily,
      isATS: arch.isATS,
      hasPhoto: arch.hasPhoto,
      sidebarPosition: arch.sidebarPosition,
      sectionOrder: [...arch.sectionOrder],
    };
  });
});

export const TEMPLATE_STYLES: TemplateStyle[] = [
  'Modern', 'Classic', 'Minimal', 'Corporate', 'Executive', 'ATS-friendly',
  'Creative', 'Elegant', 'Professional', 'Clean', 'Two-column', 'Single-column',
  'Timeline', 'Sidebar', 'Compact', 'Academic', 'Technical', 'Leadership',
  'Premium-style', 'Simple professional'
];

export function getTemplateById(id: string): CVTemplate {
  const found = ALL_TEMPLATES.find((t) => t.id === id);
  if (found) return found;
  return ALL_TEMPLATES[0];
}

export function getTemplatesByCategory(categoryId: string): CVTemplate[] {
  return ALL_TEMPLATES.filter((t) => t.categoryId === categoryId);
}

export const DEFAULT_SECTIONS = [
  { id: 'personal', name: 'Personal Details', visible: true },
  { id: 'summary', name: 'Professional Summary', visible: true },
  { id: 'categoryFields', name: 'Specialization & Technical Focus', visible: true },
  { id: 'experience', name: 'Work Experience', visible: true },
  { id: 'education', name: 'Education', visible: true },
  { id: 'skills', name: 'Skills & Competencies', visible: true },
  { id: 'projects', name: 'Projects & Case Studies', visible: true },
  { id: 'certifications', name: 'Certifications', visible: true },
  { id: 'languages', name: 'Languages', visible: true },
  { id: 'awards', name: 'Awards & Honors', visible: true },
  { id: 'references', name: 'References', visible: true },
];
