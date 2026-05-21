import React, { useState, useRef, useEffect } from 'react';
import { useConsultation } from '../hooks/useConsultation';
import ChatMessage from './ChatMessage';

/** @description: AI Consultation floating chat widget. */
const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const { messages, isLoading, sendMessage } = useConsultation();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue;
    setInputValue('');

    // Reset textarea height using ref
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    await sendMessage(message);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] sm:h-[600px] bg-white rounded-2xl shadow-2xl border border-outline/20 flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-primary px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-on-primary">smart_toy</span>
              <div>
                <h3 className="font-title text-on-primary text-base font-semibold">
                  AI Consultant
                </h3>
                <p className="text-on-primary/70 text-[10px] uppercase tracking-wider font-label">
                  Always Online
                </p>
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-grow overflow-y-auto p-4 bg-background/50 custom-scrollbar">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-surface border border-outline/30 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-on-surface-variant/40 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-on-surface-variant/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-on-surface-variant/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white border-t border-outline/10 flex items-end gap-2"
          >
            <textarea
              ref={textareaRef}
              rows="1"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                e.target.style.height = 'auto';
                const newHeight = e.target.scrollHeight;
                e.target.style.height = `${newHeight}px`;

                // Show scrollbar only if content exceeds max-height (128px)
                if (newHeight > 128) {
                  e.target.style.overflowY = 'auto';
                } else {
                  e.target.style.overflowY = 'hidden';
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="Ask me anything about perfumes..."
              className="flex-grow px-4 py-2 bg-background border border-outline/20 rounded-2xl text-sm font-body focus:outline-none focus:border-primary/50 transition-colors resize-none max-h-32 overflow-y-hidden custom-scrollbar"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                !inputValue.trim() || isLoading
                  ? 'bg-outline/20 text-on-surface-variant/40 cursor-not-allowed'
                  : 'bg-primary text-on-primary hover:scale-105 active:scale-95'
              }`}
              aria-label="Send Message"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>
        </div>
      )}

      {/* FAB Toggle Button */}
      <button
        onClick={handleToggle}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform ${
          isOpen
            ? 'bg-error text-white rotate-90 scale-0 opacity-0 hidden'
            : 'bg-primary text-on-primary hover:scale-110 active:scale-90'
        }`}
        aria-label="Open AI Consultation"
        style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
      >
        <span className="material-symbols-outlined text-[28px]">smart_toy</span>
      </button>

      {/* Small close button when open */}
      {isOpen && (
        <button
          onClick={handleToggle}
          className="w-14 h-14 rounded-full bg-surface border border-outline/20 shadow-lg flex items-center justify-center text-on-surface hover:text-error transition-all hover:scale-110 active:scale-90"
          aria-label="Close Chat"
        >
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
