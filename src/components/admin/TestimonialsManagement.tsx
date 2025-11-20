import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react';
import { supabase, Testimonial } from '../../lib/supabase';

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Testimonial>>({
    client_name: '',
    client_company: '',
    client_role: '',
    testimonial_text: '',
    rating: 5,
    image_url: '',
    is_featured: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  }

  const startAdd = () => {
    setIsAdding(true);
    setEditForm({
      client_name: '',
      client_company: '',
      client_role: '',
      testimonial_text: '',
      rating: 5,
      image_url: '',
      is_featured: true,
    });
  };

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id);
    setEditForm(testimonial);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setEditForm({
      client_name: '',
      client_company: '',
      client_role: '',
      testimonial_text: '',
      rating: 5,
      image_url: '',
      is_featured: true,
    });
  };

  const saveTestimonial = async () => {
    try {
      if (isAdding) {
        const { error } = await supabase.from('testimonials').insert([editForm]);
        if (error) throw error;
      } else if (editingId) {
        const { error } = await supabase
          .from('testimonials')
          .update({
            ...editForm,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editingId);
        if (error) throw error;
      }

      await fetchTestimonials();
      cancelEdit();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Error saving testimonial');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Error deleting testimonial');
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          is_featured: !currentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;
      await fetchTestimonials();
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading testimonials...</div>;
  }

  const renderForm = () => (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">
        {isAdding ? 'Add New Testimonial' : 'Edit Testimonial'}
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
            Company Name *
          </label>
          <input
            type="text"
            value={editForm.client_company || ''}
            onChange={(e) =>
              setEditForm({ ...editForm, client_company: e.target.value })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Client Role *
          </label>
          <input
            type="text"
            value={editForm.client_role || ''}
            onChange={(e) =>
              setEditForm({ ...editForm, client_role: e.target.value })
            }
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Owner, CEO, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Rating *
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => setEditForm({ ...editForm, rating })}
                className="p-2 hover:bg-slate-200 rounded transition-colors"
              >
                <Star
                  className={`w-6 h-6 ${
                    (editForm.rating || 0) >= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Testimonial Text *
        </label>
        <textarea
          value={editForm.testimonial_text || ''}
          onChange={(e) =>
            setEditForm({ ...editForm, testimonial_text: e.target.value })
          }
          rows={4}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Image URL (optional)
        </label>
        <input
          type="url"
          value={editForm.image_url || ''}
          onChange={(e) =>
            setEditForm({ ...editForm, image_url: e.target.value })
          }
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
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
          onClick={saveTestimonial}
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
          Testimonials ({testimonials.length})
        </h2>
        {!isAdding && !editingId && (
          <button
            onClick={startAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        )}
      </div>

      {(isAdding || editingId) && renderForm()}

      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white border border-slate-200 rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  testimonial.is_featured
                    ? 'bg-green-100 text-green-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {testimonial.is_featured ? 'Featured' : 'Hidden'}
              </span>
            </div>

            <p className="text-slate-700 mb-4 line-clamp-3">
              "{testimonial.testimonial_text}"
            </p>

            <div className="mb-4 pb-4 border-b border-slate-200">
              <div className="font-semibold text-slate-900">
                {testimonial.client_name}
              </div>
              <div className="text-sm text-slate-600">
                {testimonial.client_role}, {testimonial.client_company}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startEdit(testimonial)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                Edit
              </button>
              <button
                onClick={() =>
                  toggleFeatured(testimonial.id, testimonial.is_featured)
                }
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  testimonial.is_featured
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-green-100 hover:bg-green-200 text-green-700'
                }`}
              >
                {testimonial.is_featured ? 'Hide' : 'Feature'}
              </button>
              <button
                onClick={() => deleteTestimonial(testimonial.id)}
                className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors ml-auto"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
