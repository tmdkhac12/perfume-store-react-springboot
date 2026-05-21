import { vi, describe, it, expect } from 'vitest';
import { postConsultation } from './index';
import { apiClient } from '../../../services/apiClient';

vi.mock('../../../services/apiClient', () => ({
  apiClient: {
    post: vi.fn()
  }
}));

describe('postConsultation API', () => {
  it('calls apiClient.post with correct endpoint and payload', async () => {
    const payload = { message: 'Hello AI', sessionId: 'test-session' };
    const mockResponse = { data: { response: 'Hi there', sessionId: 'test-session' } };
    apiClient.post.mockResolvedValue(mockResponse);

    const result = await postConsultation(payload);

    expect(apiClient.post).toHaveBeenCalledWith('/bot/consult', payload);
    expect(result).toEqual(mockResponse);
  });
});
