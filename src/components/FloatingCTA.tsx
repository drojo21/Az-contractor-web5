import { Phone, ArrowRight } from 'lucide-react';

interface FloatingCTAProps {
  onGetStarted: () => void;
}

export default function FloatingCTA({ onGetStarted }: FloatingCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-white border-t border-slate-200 shadow-2xl px-4 py-3 flex gap-3">
        <a
          href="tel:+15204613937"
          className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 py-3 rounded-lg font-semibold transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <button
          onClick={onGetStarted}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 rounded-lg font-semibold transition-all"
        >
          Get a Quote
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
