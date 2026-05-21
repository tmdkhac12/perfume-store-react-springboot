import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useConsultation } from './useConsultation';
import { postConsultation } from '../api';

vi.mock('../api', () => ({
  postConsultation: vi.fn()
}));

describe('useConsultation hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it('initializes with a welcome message', () => {
    const { result } = renderHook(() => useConsultation());

    expect(result.current.messages).toHaveLength(1);
    expect(result.current.messages[0].sender).toBe('bot');
    expect(result.current.messages[0].text).toContain('Welcome');
  });

  it('sends a user message and receives a bot response', async () => {
    const mockApiResponse = {
      data: { response: 'This is the AI response', sessionId: 'new-session-id' }
    };
    postConsultation.mockResolvedValue(mockApiResponse);

    const { result } = renderHook(() => useConsultation());

    await act(async () => {
      await result.current.sendMessage('I need a fresh perfume');
    });

    expect(result.current.messages).toHaveLength(3); // Welcome + User + Bot
    expect(result.current.messages[1].sender).toBe('user');
    expect(result.current.messages[1].text).toBe('I need a fresh perfume');
    expect(result.current.messages[2].sender).toBe('bot');
    expect(result.current.messages[2].text).toBe('This is the AI response');
    expect(sessionStorage.getItem('consultation_session_id')).toBe('new-session-id');
  });

  it('handles loading state during message sending', async () => {
    let resolveApi;
    const apiPromise = new Promise((resolve) => {
      resolveApi = resolve;
    });
    postConsultation.mockReturnValue(apiPromise);

    const { result } = renderHook(() => useConsultation());

    let sendPromise;
    await act(async () => {
      sendPromise = result.current.sendMessage('Hello');
    });

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      resolveApi({ data: { response: 'Hi', sessionId: 'id' } });
      await sendPromise;
    });

    expect(result.current.isLoading).toBe(false);
  });
});
