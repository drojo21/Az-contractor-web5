import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How long does it take to build my website?',
    a: "Most websites are live within 2 weeks of your approval. We start immediately after receiving your information and run a fast, streamlined process to minimize delays.",
  },
  {
    q: 'Do I own my website?',
    a: "Yes, 100%. Once your project is complete, you own all the code, content, and your domain name. We don't lock you into proprietary platforms.",
  },
  {
    q: 'What if I need changes after launch?',
    a: "All packages include a 30-day revision window after launch. Our Pro and Enterprise plans include monthly support hours for ongoing updates.",
  },
  {
    q: 'Do I need to provide photos and content?',
    a: "We make it easy. We can work with your existing photos and text, or assist with copywriting. We'll send you a simple intake form to gather what we need.",
  },
  {
    q: 'Will my website show up on Google?',
    a: "Every site we build is SEO-optimized from day one — fast load times, local keywords, proper metadata, and Google Business Profile setup. Results typically improve over 60–90 days.",
  },
  {
    q: 'What payment methods do you accept?',
    a: "We accept all major credit cards, debit cards, ACH bank transfer, and Zelle. After you submit your quote request, we'll send a secure payment link to your email.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-blue-500 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
