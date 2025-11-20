import { useState } from 'react';
import { LogOut, Users, Briefcase, MessageSquare, FolderOpen, Home } from 'lucide-react';
import { signOut } from '../../lib/auth';
import LeadsManagement from './LeadsManagement';
import ServicesManagement from './ServicesManagement';
import TestimonialsManagement from './TestimonialsManagement';
import PortfolioManagement from './PortfolioManagement';

type Tab = 'leads' | 'services' | 'testimonials' | 'portfolio';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('leads');
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'leads' as Tab, label: 'Leads', icon: Users },
    { id: 'services' as Tab, label: 'Services', icon: Briefcase },
    { id: 'testimonials' as Tab, label: 'Testimonials', icon: MessageSquare },
    { id: 'portfolio' as Tab, label: 'Portfolio', icon: FolderOpen },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-slate-900">
              Az Contractor Pro - Admin
            </h1>

            <div className="flex items-center gap-4">
              <a
                href="/"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">View Site</span>
              </a>
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <nav className="flex -mb-px overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'leads' && <LeadsManagement />}
            {activeTab === 'services' && <ServicesManagement />}
            {activeTab === 'testimonials' && <TestimonialsManagement />}
            {activeTab === 'portfolio' && <PortfolioManagement />}
          </div>
        </div>
      </div>
    </div>
  );
}
