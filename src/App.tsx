import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Footer from './components/Footer';
import QuoteForm from './components/QuoteForm';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { Service } from './lib/supabase';

const isAdminPath = window.location.pathname === '/admin';

function AppContent() {
  const { user, loading } = useAuth();
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();

  const handleGetStarted = (service?: Service) => {
    setSelectedService(service);
    setShowQuoteForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" role="status" aria-live="polite">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-hidden="true"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAdminPath) {
    if (user) {
      return <AdminDashboard />;
    }
    return <AdminLogin onSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetStarted={() => handleGetStarted()} />
      <main className="pt-16">
        <Hero onGetStarted={() => handleGetStarted()} />
        <Services onSelectService={handleGetStarted} />
        <Portfolio />
        <Testimonials />
        <About />
      </main>
      <Footer />

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
