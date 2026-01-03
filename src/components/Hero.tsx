import { ArrowRight, Globe, Star, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJWMzZoLTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6bTAtNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 text-sm">
              <Globe className="w-4 h-4" />
              <span>Trusted by Arizona Contractors</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Get More Customers
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                With Your Own Website
              </span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed">
              Professional website design and social media marketing built specifically for contractors.
              Stop losing jobs to competitors with better online presence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onGetStarted}
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold text-blue-400">50+</div>
                <div className="text-sm text-slate-400">Happy Contractors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">98%</div>
                <div className="text-sm text-slate-400">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">2 Weeks</div>
                <div className="text-sm text-slate-400">Average Launch</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative z-10 space-y-6">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-300">
                <img
                  src="https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg"
                  alt="Phoenix Arizona skyline"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-slate-600 text-sm font-medium">5.0</span>
                  </div>
                  <p className="text-slate-700 text-sm italic">
                    "Our new website brought in 10+ new leads in the first month!"
                  </p>
                  <p className="text-slate-900 font-semibold mt-2 text-sm">
                    - Mike Johnson, Phoenix Builders
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-lg">
                  <CheckCircle2 className="w-8 h-8 mb-2" />
                  <p className="font-semibold">Mobile Optimized</p>
                  <p className="text-xs text-blue-100 mt-1">Looks great on all devices</p>
                </div>
                <div className="flex-1 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg">
                  <CheckCircle2 className="w-8 h-8 mb-2" />
                  <p className="font-semibold">SEO Ready</p>
                  <p className="text-xs text-cyan-100 mt-1">Get found on Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
