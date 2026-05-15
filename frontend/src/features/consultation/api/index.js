import { apiClient } from '../../../services/apiClient';

/**
 * @description: Sends a consultation message to the AI bot.
 * @param {import('../types').ConsultationRequest} payload - The message and optional session ID.
 * @returns {Promise<import('../types').ConsultationResponse>} The AI response.
 */
export const postConsultation = async (payload) => {
  return await apiClient.post('/bot/consult', payload);
};
