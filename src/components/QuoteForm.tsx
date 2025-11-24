import { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, CreditCard } from 'lucide-react';
import { supabase, Service } from '../lib/supabase';

interface QuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: Service;
}

type FormStep = 'service' | 'info' | 'details' | 'payment';

interface FormData {
  service_id: string;
  name: string;
  email: string;
  phone: string;
  company_name: string;
  business_type: string;
  current_website: string;
  message: string;
}

export default function QuoteForm({ isOpen, onClose, selectedService }: QuoteFormProps) {
  const [step, setStep] = useState<FormStep>('service');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serviceLoadError, setServiceLoadError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    service_id: selectedService?.id || '',
    name: '',
    email: '',
    phone: '',
    company_name: '',
    business_type: '',
    current_website: '',
    message: '',
  });

  useEffect(() => {
    if (isOpen && services.length === 0) {
      fetchServices();
    }
  }, [isOpen]);

  async function fetchServices() {
    setServiceLoadError('');
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setServices(data || []);
      if (selectedService) {
        setFormData(prev => ({ ...prev, service_id: selectedService.id }));
      }
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to load service packages. Please try again.';
      setServiceLoadError(errorMessage);
      console.error('Error fetching services:', err);
    }
  }

  const selectedServiceData = services.find(s => s.id === formData.service_id) || selectedService;

  const handleNext = () => {
    if (step === 'service' && !formData.service_id) {
      setError('Please select a service package');
      return;
    }
    if (step === 'info' && (!formData.name || !formData.email || !formData.phone)) {
      setError('Please fill in all required fields');
      return;
    }
    if (step === 'details' && !formData.company_name) {
      setError('Please enter your company name');
      return;
    }

    setError('');
    const steps: FormStep[] = ['service', 'info', 'details', 'payment'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const steps: FormStep[] = ['service', 'info', 'details', 'payment'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          ...formData,
          status: 'new',
          payment_status: 'pending',
        }]);

      if (error) throw error;

      onClose();
      setFormData({
        service_id: '',
        name: '',
        email: '',
        phone: '',
        company_name: '',
        business_type: '',
        current_website: '',
        message: '',
      });
      setStep('service');

      alert('Thank you! We will contact you shortly to process your payment and get started on your project.');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const progress = {
    service: 25,
    info: 50,
    details: 75,
    payment: 100,
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Get Your Quote</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-2">
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
              style={{ width: `${progress[step]}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {step === 'service' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Choose Your Package
                </h3>
                {serviceLoadError ? (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <p className="text-red-700 mb-4">{serviceLoadError}</p>
                    <button
                      onClick={fetchServices}
                      className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-8 text-slate-600">
                    Loading service packages...
                  </div>
                ) : (
                  <div className="space-y-3">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.service_id === service.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={formData.service_id === service.id}
                          onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
                          className="sr-only"
                        />
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-semibold text-slate-900 text-lg">
                              {service.name}
                            </div>
                            <div className="text-slate-600 text-sm mt-1">
                              {service.description}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              ${service.price}
                            </div>
                            {service.name === 'Enterprise' && (
                              <div className="text-xs text-slate-600">/month</div>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'info' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Your Contact Information
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Tell Us About Your Business
              </h3>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Smith Plumbing Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type of Contracting Business
                </label>
                <select
                  value={formData.business_type}
                  onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your industry</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="hvac">HVAC</option>
                  <option value="roofing">Roofing</option>
                  <option value="general">General Contractor</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="painting">Painting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Website (if any)
                </label>
                <input
                  type="url"
                  value={formData.current_website}
                  onChange={(e) => setFormData({ ...formData, current_website: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your goals, target customers, or any specific requirements..."
                />
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Review & Submit
              </h3>

              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center gap-3 text-green-600 font-semibold text-lg">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-5 h-5" />
                  </div>
                  <span>Almost Done!</span>
                </div>

                <div className="border-t border-slate-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Selected Package:</span>
                    <span className="font-semibold text-slate-900">
                      {selectedServiceData?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Name:</span>
                    <span className="font-semibold text-slate-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Email:</span>
                    <span className="font-semibold text-slate-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Company:</span>
                    <span className="font-semibold text-slate-900">{formData.company_name}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-3 mt-3 flex justify-between items-center">
                    <span className="text-slate-900 font-semibold text-lg">Total:</span>
                    <span className="text-3xl font-bold text-blue-600">
                      ${selectedServiceData?.price}
                      {selectedServiceData?.name === 'Enterprise' && (
                        <span className="text-lg text-slate-600">/mo</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-slate-700">
                    <strong>Note:</strong> After submitting this form, we'll send you a secure
                    payment link via email to complete your order. No payment information is
                    required at this step.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-between">
          {step !== 'service' && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 text-slate-600 hover:text-slate-900 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {step !== 'payment' ? (
            <button
              onClick={handleNext}
              className="ml-auto flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="ml-auto flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
              <Check className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
