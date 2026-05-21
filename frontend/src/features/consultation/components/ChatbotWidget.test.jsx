import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ChatbotWidget from './ChatbotWidget';
import { useConsultation } from '../hooks/useConsultation';

vi.mock('../hooks/useConsultation', () => ({
  useConsultation: vi.fn()
}));

// Mock scrollIntoView as it's not implemented in JSDOM
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('ChatbotWidget', () => {
  it('renders only the FAB button initially', () => {
    useConsultation.mockReturnValue({
      messages: [],
      isLoading: false,
      sendMessage: vi.fn()
    });

    render(<ChatbotWidget />);

    expect(screen.getByLabelText('Open AI Consultation')).toBeInTheDocument();
    expect(screen.queryByText('AI Consultant')).not.toBeInTheDocument();
  });

  it('toggles the chat window when FAB is clicked', () => {
    useConsultation.mockReturnValue({
      messages: [{ id: '1', text: 'Welcome', sender: 'bot', timestamp: new Date().toISOString() }],
      isLoading: false,
      sendMessage: vi.fn()
    });

    render(<ChatbotWidget />);

    fireEvent.click(screen.getByLabelText('Open AI Consultation'));

    expect(screen.getByText('AI Consultant')).toBeInTheDocument();
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Close Chat')[0]).toBeInTheDocument();
  });

  it('calls sendMessage when form is submitted', () => {
    const sendMessage = vi.fn();
    useConsultation.mockReturnValue({
      messages: [],
      isLoading: false,
      sendMessage
    });

    render(<ChatbotWidget />);

    // Open chat
    fireEvent.click(screen.getByLabelText('Open AI Consultation'));

    const input = screen.getByPlaceholderText('Ask me anything about perfumes...');
    const sendButton = screen.getByLabelText('Send Message');

    fireEvent.change(input, { target: { value: 'Looking for citrus' } });
    fireEvent.click(sendButton);

    expect(sendMessage).toHaveBeenCalledWith('Looking for citrus');
  });
});
