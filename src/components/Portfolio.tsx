import { useEffect, useState } from 'react';
import { ExternalLink, TrendingUp } from 'lucide-react';
import { supabase, Portfolio as PortfolioType } from '../lib/supabase';

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolio(data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="portfolio" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading portfolio...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Our Recent Work
          </h2>
          <p className="text-xl text-slate-600">
            See how we've helped contractors like you grow their business with
            professional websites and digital marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <img
                  src={item.image_url}
                  alt={item.project_title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.service_type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                  <span className="font-semibold">{item.industry}</span>
                  <span>•</span>
                  <span>{item.client_name}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.project_title}
                </h3>

                <p className="text-slate-600 mb-4 line-clamp-3">
                  {item.description}
                </p>

                {Object.keys(item.results).length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 text-green-600 font-semibold mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Results</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      {Object.entries(item.results).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-slate-600 capitalize">
                            {key.replace(/_/g, ' ')}:
                          </span>
                          <span className="font-semibold text-slate-900">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.website_url && (
                  <a
                    href={item.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    View Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
