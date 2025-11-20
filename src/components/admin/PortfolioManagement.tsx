import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, ExternalLink } from 'lucide-react';
import { supabase, Portfolio } from '../../lib/supabase';

export default function PortfolioManagement() {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Portfolio>>({
    client_name: '',
    project_title: '',
    description: '',
    industry: '',
    service_type: '',
    image_url: '',
    website_url: '',
    results: {},
    is_featured: true,
  });

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    try {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPortfolio(data || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  }

  const startAdd = () => {
    setIsAdding(true);
    setEditForm({
      client_name: '',
      project_title: '',
      description: '',
      industry: '',
      service_type: 'Basic',
      image_url: '',
      website_url: '',
      results: {},
      is_featured: true,
    });
  };

  const startEdit = (item: Portfolio) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setEditForm({
      client_name: '',
      project_title: '',
      description: '',
      industry: '',
      service_type: '',
      image_url: '',
      website_url: '',
      results: {},
      is_featured: true,
    });
  };

  const savePortfolio = async () => {
    try {
      if (isAdding) {
        const { error } = await supabase.from('portfolio').insert([editForm]);
        if (error) throw error;
      } else if (editingId) {
        const { error } = await supabase
          .from('portfolio')
          .update({
            ...editForm,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);
        if (error) throw error;
      }

      await fetchPortfolio();
      cancelEdit();
    } catch (error) {
      console.error('Error saving portfolio:', error);
      alert('Error saving portfolio item');
    }
  };

  const deletePortfolio = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;

    try {
      const { error } = await supabase.from('portfolio').delete().eq('id', id);
      if (error) throw error;
      await fetchPortfolio();
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      alert('Error deleting portfolio item');
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('portfolio')
        .update({
          is_featured: !currentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      await fetchPortfolio();
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading portfolio...</div>;
  }

  const renderForm = () => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">
        {isAdding ? 'Add New Portfolio Item' : 'Edit Portfolio Item'}
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Client Name *
          </label>
          <input
            type="text"
            value={editForm.client_name || ''}
            onChange={(e) =>
              setEditForm({ ...editForm, client_name: e.target.value })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            value={editForm.project_title || ''}
            onChange={(e) =>
              setEditForm({ ...editForm, project_title: e.target.value })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Industry *
          </label>
          <select
            value={editForm.industry || ''}
            onChange={(e) =>
              setEditForm({ ...editForm, industry: e.target.value })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select industry</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="HVAC">HVAC</option>
            <option value="Roofing">Roofing</option>
            <option value="General Contractor">General Contractor</option>
            <option value="Landscaping">Landscaping</option>
            <option value="Painting">Painting</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Service Type *
          </label>
          <select
            value={editForm.service_type || ''}
            onChange={(e) =>
              setEditForm({ ...editForm, service_type: e.target.value })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Basic">Basic</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Description *
        </label>
        <textarea
          value={editForm.description || ''}
          onChange={(e) =>
            setEditForm({ ...editForm, description: e.target.value })
          }
          rows={3}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Image URL * (Use Pexels or similar)
        </label>
        <input
          type="url"
          value={editForm.image_url || ''}
          onChange={(e) =>
            setEditForm({ ...editForm, image_url: e.target.value })
          }
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://images.pexels.com/..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Website URL
        </label>
        <input
          type="url"
          value={editForm.website_url || ''}
          onChange={(e) =>
            setEditForm({ ...editForm, website_url: e.target.value })
          }
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Results (JSON format)
        </label>
        <textarea
          value={JSON.stringify(editForm.results || {}, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setEditForm({ ...editForm, results: parsed });
            } catch (err) {
              // Invalid JSON, don't update
            }
          }}
          rows={4}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          placeholder='{"metric_1": "value_1", "metric_2": "value_2"}'
        />
        <p className="text-xs text-slate-600 mt-1">
          Example: {`{"new_leads": "23 in first month", "conversion_rate": "12%"}`}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={editForm.is_featured || false}
          onChange={(e) =>
            setEditForm({ ...editForm, is_featured: e.target.checked })
          }
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="featured" className="text-sm text-slate-700">
          Featured (show on website)
        </label>
      </div>

      <div className="flex gap-2 pt-4 border-t border-slate-200">
        <button
          onClick={savePortfolio}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={cancelEdit}
          className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">
          Portfolio ({portfolio.length})
        </h2>
        {!isAdding && !editingId && (
          <button
            onClick={startAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Portfolio Item
          </button>
        )}
      </div>

      {(isAdding || editingId) && renderForm()}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200 rounded-lg overflow-hidden"
          >
            <div className="relative h-48 bg-slate-100">
              <img
                src={item.image_url}
                alt={item.project_title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  {item.service_type}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.is_featured
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-500 text-white'
                  }`}
                >
                  {item.is_featured ? 'Featured' : 'Hidden'}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="text-xs text-slate-600 mb-1">
                {item.industry} • {item.client_name}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">
                {item.project_title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                {item.description}
              </p>

              {item.website_url && (
                <a
                  href={item.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mb-3"
                >
                  <ExternalLink className="w-3 h-3" />
                  View Website
                </a>
              )}

              <div className="flex gap-2 pt-3 border-t border-slate-200">
                <button
                  onClick={() => startEdit(item)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-medium transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => toggleFeatured(item.id, item.is_featured)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    item.is_featured
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      : 'bg-green-100 hover:bg-green-200 text-green-700'
                  }`}
                >
                  {item.is_featured ? 'Hide' : 'Feature'}
                </button>
                <button
                  onClick={() => deletePortfolio(item.id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors ml-auto"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
