import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

/**
 * @description: Individual chat message bubble with Markdown support for bot responses.
 * @param {import('../types').ChatMessage} message - The message object.
 */
const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${
            isBot
              ? 'bg-surface text-on-surface border border-outline/30 rounded-bl-none'
              : 'bg-primary text-on-primary rounded-br-none'
          }`}
      >
        {isBot ? (
          <div className="font-body space-y-2">
            <ReactMarkdown
              components={{
                // Style bold text with primary color and semi-bold weight
                strong: ({ node, ...props }) => (
                  <span className="font-bold text-primary" {...props} />
                ),
                // Style links as luxury action links using React Router
                a: ({ node, ...props }) => (
                  <Link
                    to={props.href}
                    className="inline-flex items-center gap-1 text-primary font-bold underline underline-offset-4 hover:opacity-70 transition-all my-1"
                  >
                    {props.children}
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </Link>
                ),
                // Ensure paragraphs have proper spacing
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="font-body whitespace-pre-wrap">{message.text}</p>
        )}
        <div
          className={`text-[10px] mt-2 opacity-50 ${isBot ? 'text-on-surface-variant' : 'text-on-primary'}`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
