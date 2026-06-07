import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import About from './components/About';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import QuoteForm from './components/QuoteForm';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { Service } from './lib/supabase';

function AppContent() {
  const { user, loading } = useAuth();
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setShowAdminLogin(true);
    }
  }, []);

  const handleGetStarted = (service?: Service) => {
    setSelectedService(service);
    setShowQuoteForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showAdminLogin || window.location.pathname === '/admin') {
    if (user) {
      return <AdminDashboard />;
    }
    return <AdminLogin onSuccess={() => setShowAdminLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetStarted={() => handleGetStarted()} />
      <main className="pt-16 pb-16 md:pb-0">
        <Hero onGetStarted={() => handleGetStarted()} />
        <HowItWorks />
        <Services onSelectService={handleGetStarted} />
        <Portfolio />
        <Testimonials />
        <About />
        <FAQ />
      </main>
      <Footer />
      <FloatingCTA onGetStarted={() => handleGetStarted()} />

      <QuoteForm
        isOpen={showQuoteForm}
        onClose={() => {
          setShowQuoteForm(false);
          setSelectedService(undefined);
        }}
        selectedService={selectedService}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
