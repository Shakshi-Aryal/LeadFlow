import { useState } from 'react';
import { submitLead } from '../services/api';

export const useSubmitLead = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const submit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      await submitLead(data);
      setIsSuccess(true);
      return true;
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setIsSubmitting(false);
    setError(null);
    setIsSuccess(false);
  };

  return { submit, isSubmitting, error, isSuccess, resetState, setError };
};
