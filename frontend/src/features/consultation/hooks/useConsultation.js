import { useState, useCallback } from 'react';
import { postConsultation } from '../api';

const SESSION_KEY = 'consultation_session_id';
const WELCOME_MESSAGE = "Welcome! I am your AI perfume consultant. How can I help you find your perfect scent today?";

/**
 * @description: Hook to manage AI perfume consultation state and logic.
 * @returns {object} { messages, isLoading, sendMessage }
 */
export const useConsultation = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      text: WELCOME_MESSAGE,
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @description: Sends a message to the AI and updates state.
   * @param {string} text - The user's message.
   * @returns {Promise<void>}
   */
  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const sessionId = sessionStorage.getItem(SESSION_KEY);
      const response = await postConsultation({ message: text, sessionId });

      if (response && response.data) {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          text: response.data.response,
          sender: 'bot',
          timestamp: response.timestamp || new Date().toISOString(),
        };

        if (response.data.sessionId) {
          sessionStorage.setItem(SESSION_KEY, response.data.sessionId);
        }

        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(response.message || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error('Consultation error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
