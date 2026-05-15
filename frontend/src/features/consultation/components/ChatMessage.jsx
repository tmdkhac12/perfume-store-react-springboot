import React from 'react';

/**
 * @description: Individual chat message bubble.
 * @param {import('../types').ChatMessage} message - The message object.
 */
const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isBot 
            ? 'bg-surface text-on-surface border border-outline/30 rounded-bl-none' 
            : 'bg-primary text-on-primary rounded-br-none'}`}
      >
        <p className="font-body whitespace-pre-wrap">{message.text}</p>
        <div className={`text-[10px] mt-1 opacity-50 ${isBot ? 'text-on-surface-variant' : 'text-on-primary'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
