import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onGetStarted: () => void;
}

export default function Navbar({ onGetStarted }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img
              src="/image.png"
              alt="Az Contractor Pro"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-slate-900">
              Az Contractor Pro
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              About
            </button>
            <button
              onClick={onGetStarted}
              className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
