import { Target, Users, Zap, Award } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Target,
      title: 'Contractor-Focused',
      description: 'We specialize exclusively in helping contractors grow their businesses online. We understand your industry and your customers.',
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Your website can be live in as little as 2 weeks. We know you need to start generating leads quickly.',
    },
    {
      icon: Users,
      title: 'Proven Results',
      description: 'Our clients see an average increase of 40% in qualified leads within the first 3 months of launching.',
    },
    {
      icon: Award,
      title: 'All-Inclusive',
      description: 'No hidden fees or surprise charges. Everything you need to succeed online is included in your package.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              Your Partner in Digital Growth
            </h2>
            <div className="space-y-4 text-lg text-slate-600">
              <p>
                At Az Contractor Pro, we understand the challenges contractors face in the digital age.
                You're experts at your trade, but marketing online shouldn't require you to become
                a web developer or social media guru.
              </p>
              <p>
                That's why we created simple, affordable packages that give you everything you need
                to compete online. From professional websites to social media management and ongoing
                advertising, we handle the digital marketing so you can focus on what you do best.
              </p>
              <p className="font-semibold text-slate-900">
                We've helped over 50 contractors across Arizona grow their businesses with professional
                online presence and smart digital marketing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-colors"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Grow Your Contracting Business?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join dozens of successful Arizona contractors who trust us with their digital presence.
            Get started today with a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Our Packages
            </a>
            <a
              href="tel:+15551234567"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-3 rounded-lg font-semibold border border-white/20 hover:border-white/40 transition-all"
            >
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
