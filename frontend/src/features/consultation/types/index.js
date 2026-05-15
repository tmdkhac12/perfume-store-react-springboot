/**
 * @typedef {Object} ConsultationRequest
 * @property {string} message - The message sent by the user. Example: "I am looking for a fresh perfume."
 * @property {string} [sessionId] - Optional session ID to maintain conversation context.
 */

/**
 * @typedef {Object} ConsultationData
 * @property {string} response - The AI's response message.
 * @property {string} sessionId - The session ID for the current conversation.
 */

/**
 * @typedef {Object} ConsultationResponse
 * @property {string} timestamp - ISO timestamp of the response.
 * @property {number} status - HTTP status code.
 * @property {string} path - API endpoint path.
 * @property {ConsultationData} data - The response data.
 * @property {string} message - Status message.
 * @property {any} error - Error details if any.
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id - Unique identifier for the message.
 * @property {string} text - Content of the message.
 * @property {'user' | 'bot'} sender - Who sent the message.
 * @property {string} timestamp - When the message was sent.
 */

export {};
