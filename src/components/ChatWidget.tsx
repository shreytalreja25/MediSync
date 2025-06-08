'use client'

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, QuickReply, SessionData } from '@/types/chat';
import { useRouter } from 'next/navigation';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: "Hi! I'm MediSync Digital Assistant. How can I help you today?",
  type: 'quick_reply',
  quickReplies: [
    { text: "Book an Appointment", action: "book_appointment" },
    { text: "Find Nearby Hospitals", action: "find_hospitals" },
    { text: "Fill Health Form", action: "fill_form" },
    { text: "General Query", action: "general_query" }
  ]
};

interface FormData {
  name?: string;
  age?: string;
  symptoms?: string;
  preferredDate?: string;
  preferredTime?: string;
  location?: string;
}

export default function ChatWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentForm, setCurrentForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize Gemini AI with API key
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY || "");

  // Initialize session
  useEffect(() => {
    const savedSession = localStorage.getItem('chatSession');
    if (savedSession) {
      const session: SessionData = JSON.parse(savedSession);
      if (Date.now() - session.lastActive < SESSION_TIMEOUT) {
        setMessages(session.messages);
      } else {
        // Session expired, start new session
        startNewSession();
      }
    } else {
      startNewSession();
    }

    return () => {
      if (sessionTimeoutRef.current) {
        clearTimeout(sessionTimeoutRef.current);
      }
    };
  }, []);

  const startNewSession = () => {
    const newSession: SessionData = {
      sessionId: Date.now().toString(),
      lastActive: Date.now(),
      messages: [WELCOME_MESSAGE]
    };
    setMessages([WELCOME_MESSAGE]);
    localStorage.setItem('chatSession', JSON.stringify(newSession));
  };

  const updateSession = (newMessages: Message[]) => {
    const session: SessionData = {
      sessionId: Date.now().toString(),
      lastActive: Date.now(),
      messages: newMessages
    };
    localStorage.setItem('chatSession', JSON.stringify(session));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = (formType: string) => {
    let response: Message;
    
    switch (formType) {
      case 'appointment':
        response = {
          role: 'assistant',
          content: `Great! I've scheduled your appointment for ${formData.preferredDate} at ${formData.preferredTime}. You'll receive a confirmation shortly.`,
          type: 'text'
        };
        break;
      case 'health':
        response = {
          role: 'assistant',
          content: `Thank you for providing your health information. Based on your symptoms (${formData.symptoms}), I recommend scheduling a consultation. Would you like to book an appointment?`,
          type: 'quick_reply',
          quickReplies: [
            { text: "Yes, Book Appointment", action: "book_appointment" },
            { text: "No, Thanks", action: "general_query" }
          ]
        };
        break;
      default:
        response = {
          role: 'assistant',
          content: "Form submitted successfully!",
          type: 'text'
        };
    }

    const newMessages = [...messages, response];
    setMessages(newMessages);
    updateSession(newMessages);
    setCurrentForm(null);
    setFormData({});
  };

  const handleQuickReply = async (action: QuickReply['action']) => {
    let response: Message;

    switch (action) {
      case 'book_appointment':
        setCurrentForm('appointment');
        response = {
          role: 'assistant',
          content: "Let's schedule your appointment. Please provide the following information:",
          type: 'form',
          formFields: [
            { name: 'name', label: 'Your Name', type: 'text' },
            { name: 'preferredDate', label: 'Preferred Date', type: 'date' },
            { name: 'preferredTime', label: 'Preferred Time', type: 'time' }
          ]
        };
        break;
      case 'find_hospitals':
        response = {
          role: 'assistant',
          content: "Please share your location to find nearby hospitals.",
          type: 'form',
          formFields: [
            { name: 'location', label: 'Your Location', type: 'text' }
          ]
        };
        break;
      case 'fill_form':
        setCurrentForm('health');
        response = {
          role: 'assistant',
          content: "Please fill out your health information:",
          type: 'form',
          formFields: [
            { name: 'name', label: 'Your Name', type: 'text' },
            { name: 'age', label: 'Your Age', type: 'number' },
            { name: 'symptoms', label: 'Describe your symptoms', type: 'textarea' }
          ]
        };
        break;
      case 'general_query':
        response = {
          role: 'assistant',
          content: "Please type your question, and I'll help you with it.",
          type: 'text'
        };
        break;
      default:
        response = {
          role: 'assistant',
          content: "I'm not sure how to help with that. Could you please rephrase?",
          type: 'text'
        };
    }

    const newMessages = [...messages, response];
    setMessages(newMessages);
    updateSession(newMessages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { 
      role: 'user', 
      content: input,
      type: 'text'
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      if (!API_KEY) {
        throw new Error('API key is not configured');
      }

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: text,
        type: 'text'
      };
      
      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      updateSession(updatedMessages);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        type: 'text'
      };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
      updateSession(updatedMessages);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = (message: Message) => {
    if (message.type !== 'form' || !message.formFields) return null;

    return (
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmit(currentForm || '');
        }}
        className="mt-3 space-y-3"
      >
        {message.formFields.map((field, idx) => (
          <div key={idx} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={formData[field.name as keyof FormData] || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue dark:bg-gray-700 dark:text-white"
                rows={3}
                required
              />
            ) : (
              <input
                type={field.type}
                value={formData[field.name as keyof FormData] || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue dark:bg-gray-700 dark:text-white"
                required
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 transition-colors"
        >
          Submit
        </button>
      </form>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-blue text-white p-4 rounded-full shadow-lg hover:bg-primary-blue/90 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900 dark:text-white">MediSync AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-primary-blue text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {message.content}
                  {message.type === 'quick_reply' && message.quickReplies && (
                    <div className="mt-3 space-y-2">
                      {message.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickReply(reply.action)}
                          className="block w-full text-left px-3 py-2 bg-white dark:bg-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                        >
                          {reply.text}
                        </button>
                      ))}
                    </div>
                  )}
                  {renderForm(message)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-gray-900 dark:text-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 