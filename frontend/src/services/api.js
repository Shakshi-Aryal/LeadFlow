import axios from 'axios';

const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '[CONFIDENTIAL_WEBHOOK_URL]';

const apiClient = axios.create({
  baseURL: WEBHOOK_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitLead = async (leadData) => {
  try {
    const response = await apiClient.post('', leadData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to submit lead.');
  }
};
