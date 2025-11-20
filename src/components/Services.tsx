import { useEffect, useState } from 'react';
import { Check, Globe, Share2, TrendingUp, ArrowRight } from 'lucide-react';
import { supabase, Service } from '../lib/supabase';

interface ServicesProps {
  onSelectService: (service: Service) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }

  const getIcon = (name: string) => {
    switch (name) {
      case 'Basic':
        return Globe;
      case 'Pro':
        return Share2;
      case 'Enterprise':
        return TrendingUp;
      default:
        return Globe;
    }
  };

  const getColor = (name: string) => {
    switch (name) {
      case 'Basic':
        return 'from-blue-500 to-blue-600';
      case 'Pro':
        return 'from-cyan-500 to-blue-500';
      case 'Enterprise':
        return 'from-orange-500 to-cyan-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  if (loading) {
    return (
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading services...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-slate-600">
            Choose the perfect package to grow your contracting business online.
            No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = getIcon(service.name);
            const colorClass = getColor(service.name);
            const isPopular = service.name === 'Pro';

            return (
              <div
                key={service.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 ${
                  isPopular ? 'ring-2 ring-blue-500 scale-105' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colorClass} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {service.name}
                  </h3>

                  <p className="text-slate-600 mb-6 min-h-[3rem]">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-bold text-slate-900">
                        ${service.price}
                      </span>
                      {service.name === 'Enterprise' && (
                        <span className="text-slate-600">/month</span>
                      )}
                    </div>
                    {service.name !== 'Enterprise' && (
                      <p className="text-sm text-slate-600 mt-1">One-time payment</p>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onSelectService(service)}
                    className={`w-full bg-gradient-to-r ${colorClass} hover:shadow-lg text-white py-3 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            Not sure which package is right for you?
          </p>
          <button
            onClick={() => onSelectService(services[0])}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Schedule a free consultation →
          </button>
        </div>
      </div>
    </section>
  );
}
