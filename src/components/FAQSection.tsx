import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'Is the CV builder completely free?',
    answer:
      'Yes, 100% free! You can create, customize, preview, and download unlimited resumes without ever entering a credit card, paying a fee, or encountering surprise paywalls.',
  },
  {
    question: 'Can I download my CV as PDF?',
    answer:
      'Absolutely. You can click the "Download PDF" button to immediately export an A4 high-resolution PDF document formatted with standard professional margins, suitable for international job applications.',
  },
  {
    question: 'Do I need to register or create an account?',
    answer:
      'No. FreeCV Studio requires no registration, no login, and no account creation. You can start building your CV right away.',
  },
  {
    question: 'Can I change templates without losing my information?',
    answer:
      'Yes! You can switch between any of the 400 professional templates at any time. All the information you entered into the form is automatically retained and reformatted for the new template design.',
  },
  {
    question: 'Can I add multiple work experiences and education entries?',
    answer:
      'Yes, you can add unlimited work experiences, education records, technical skills, projects, certifications, languages, and awards with the "+ Add" buttons.',
  },
  {
    question: 'Can I create a CV from my mobile phone?',
    answer:
      'Yes! FreeCV Studio is fully mobile-responsive. You can fill in the CV form, preview the resume, and export your PDF directly from Android, iPhone, iPad, or tablet devices.',
  },
  {
    question: 'Are the templates ATS-friendly?',
    answer:
      'Yes. We provide designated ATS-friendly templates that use standardized heading hierarchies, clean single-column or parseable dual-column structures, and avoid unreadable vector traps, ensuring high parsing scores in Taleo, Workday, Greenhouse, and Lever.',
  },
  {
    question: 'Can I print my CV directly from the browser?',
    answer:
      'Yes. FreeCV Studio includes a dedicated "Print CV" feature with optimized print CSS. It automatically strips all website navigation, advertisements, and editing controls, printing pure resume sheets on standard A4 paper.',
  },
  {
    question: 'Is my personal CV information stored on your server?',
    answer:
      'No. Your privacy is paramount. All CV processing occurs locally inside your web browser session and device storage. We do not store, harvest, or sell your personal details.',
  },
  {
    question: 'Can I hide my profile photo if I don’t want one?',
    answer:
      'Yes. In Step 1 (Personal Information), you can easily toggle "Show Photo" on or off, or use the "Photo On/Off" switch in the customization toolbar. Many countries (such as the US and UK) prefer resumes without photos, while other regions prefer them.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-16 bg-white border-t border-slate-200 print:hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Answers to common questions about building, customizing, and printing your free resume.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-slate-300"
              >
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ml-2 ${
                      isOpen ? 'transform rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
