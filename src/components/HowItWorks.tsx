import { ClipboardList, Laptop, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Get a Quote',
    description:
      "Fill out our quick form and tell us about your contracting business. We'll review your needs and send a tailored proposal within 1 business day.",
  },
  {
    icon: Laptop,
    step: '02',
    title: 'We Build Your Site',
    description:
      "Our team designs and builds your professional website, optimized for Google and mobile. You'll review and approve everything before we go live.",
  },
  {
    icon: TrendingUp,
    step: '03',
    title: 'Start Getting Leads',
    description:
      'Your site goes live and works for you 24/7. Watch new customer inquiries roll in while you stay focused on your trade.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600">
            Getting your professional website up and running is simple. We
            handle everything so you can stay focused on your work.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
          <div
            className="hidden lg:block absolute h-0.5 bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-200"
            style={{ top: '2.5rem', left: 'calc(16.67% + 3rem)', right: 'calc(16.67% + 3rem)' }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <Icon className="w-9 h-9 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed max-w-xs">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
