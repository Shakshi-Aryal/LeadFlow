import { useForm } from 'react-hook-form';
import { useSubmitLead } from '../hooks/useSubmitLead';
import { AlertCircle, X, Loader2 } from 'lucide-react';

export default function LeadForm({ onSuccess }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { submit, isSubmitting, error, setError } = useSubmitLead();

  const onSubmit = async (data) => {
    const success = await submit(data);
    if (success) {
      reset();
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div id="lead-form" className="card p-6 sm:p-10 max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Get Your Free Qualification</h2>
        <p className="text-gray-600 dark:text-gray-300">Fill out the form below to see our AI in action.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/30 dark:border-red-800 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
            <span className="text-sm text-red-800 dark:text-red-200">{error}</span>
          </div>
          <button 
            type="button"
            onClick={() => setError(null)}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
            <input
              id="name"
              type="text"
              disabled={isSubmitting}
              className={`input-field ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Work Email *</label>
            <input
              id="email"
              type="email"
              disabled={isSubmitting}
              className={`input-field ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
            <input
              id="phone"
              type="tel"
              disabled={isSubmitting}
              className="input-field"
              {...register("phone")}
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company *</label>
            <input
              id="company"
              type="text"
              disabled={isSubmitting}
              className={`input-field ${errors.company ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              {...register("company", { required: "Company is required" })}
            />
            {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>}
          </div>
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estimated Budget *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 font-medium">$</span>
            </div>
            <input
              id="budget"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 10000"
              disabled={isSubmitting}
              className={`input-field pl-8 ${errors.budget ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
              {...register("budget", { required: "Please enter your estimated budget" })}
            />
          </div>
          {errors.budget && <p className="mt-1 text-sm text-red-500">{errors.budget.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Description *</label>
          <textarea
            id="description"
            rows={4}
            disabled={isSubmitting}
            className={`input-field resize-none ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
            {...register("description", { required: "Project description is required" })}
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn-primary w-full py-3 text-base h-12"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing lead...
            </>
          ) : (
            'Submit Lead'
          )}
        </button>
      </form>
    </div>
  );
}
