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
    { text: "Book Appointment", action: "book_appointment" },
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

// Demo avatar URLs
const USER_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=User";
const BotAvatar = () => (
  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8B7355] border border-[#8B7355]/30 mr-2" style={{ minWidth: 32 }}>
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" fill="#8B7355" />
      <rect x="5" y="8" width="10" height="6" rx="3" fill="white" />
      <rect x="8.5" y="4" width="3" height="4" rx="1.5" fill="white" />
      <circle cx="7.5" cy="11" r="1" fill="#8B7355" />
      <circle cx="12.5" cy="11" r="1" fill="#8B7355" />
    </svg>
  </span>
);

export default function ChatWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentForm, setCurrentForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionTimeoutRef = useRef<NodeJS.Timeout>();
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyRating, setSurveyRating] = useState<number | null>(null);
  const [surveySubmitted, setSurveySubmitted] = useState(false);

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

  const handleRestartChat = () => {
    startNewSession();
    setMenuOpen(false);
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
    let userMessage: Message | null = null;

    // Summarize form data for user message
    if (formType === 'appointment') {
      userMessage = {
        role: 'user',
        content: `Appointment requested for ${formData.preferredDate} at ${formData.preferredTime} by ${formData.name}`,
        type: 'text'
      };
    } else if (formType === 'health') {
      userMessage = {
        role: 'user',
        content: `Health info: Name: ${formData.name}, Age: ${formData.age}, Symptoms: ${formData.symptoms}`,
        type: 'text'
      };
    } else if (formType === 'location') {
      userMessage = {
        role: 'user',
        content: `Location provided: ${formData.location}`,
        type: 'text'
      };
    }

    switch (formType) {
      case 'appointment':
        response = {
          role: 'assistant',
          content: `Great! I've scheduled your appointment for ${formData.preferredDate} at ${formData.preferredTime}. You'll receive a confirmation shortly.`,
          type: 'quick_reply',
          quickReplies: [
            { text: "Book Another Appointment", action: "book_appointment" },
            { text: "Main Menu", action: "main_menu" },
            { text: "End Chat", action: "end_chat" }
          ]
        };
        setShowSurvey(true);
        break;
      case 'health':
        response = {
          role: 'assistant',
          content: `Thank you for providing your health information. Would you like to book an appointment?`,
          type: 'quick_reply',
          quickReplies: [
            { text: "Yes, Book Appointment", action: "book_appointment" },
            { text: "No, Thanks", action: "main_menu" }
          ]
        };
        break;
      case 'location':
        response = {
          role: 'assistant',
          content: `Here are some hospitals near you: [Demo Hospital 1, Demo Hospital 2]. Would you like to book an appointment?`,
          type: 'quick_reply',
          quickReplies: [
            { text: "Book Appointment", action: "book_appointment" },
            { text: "Main Menu", action: "main_menu" }
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

    let newMessages = [...messages];
    if (userMessage) newMessages = [...newMessages, userMessage];
    newMessages = [...newMessages, response];
    setMessages(newMessages);
    updateSession(newMessages);
    setCurrentForm(null);
    setFormData({});
  };

  const handleQuickReply = async (action: QuickReply['action']) => {
    let response: Message;
    let userMessage: Message | null = null;

    // Find the quick reply text for the action
    const lastAssistant = messages.slice().reverse().find(m => m.role === 'assistant' && m.quickReplies);
    const quickReplyText = lastAssistant?.quickReplies?.find(q => q.action === action)?.text;
    if (quickReplyText) {
      userMessage = {
        role: 'user',
        content: quickReplyText,
        type: 'text'
      };
    }

    switch (action) {
      case 'book_appointment':
        response = {
          role: 'assistant',
          content: "What type of appointment would you like to book?",
          type: 'quick_reply',
          quickReplies: [
            { text: "General Physician", action: "appointment_gp" },
            { text: "Specialist", action: "appointment_specialist" },
            { text: "Lab Test", action: "appointment_lab" },
            { text: "Other", action: "appointment_other" },
            { text: "Main Menu", action: "main_menu" }
          ]
        };
        break;
      case 'appointment_gp':
      case 'appointment_specialist':
      case 'appointment_lab':
      case 'appointment_other':
        setCurrentForm('appointment');
        response = {
          role: 'assistant',
          content: "Please provide your details to book an appointment:",
          type: 'form',
          formFields: [
            { name: 'name', label: 'Your Name', type: 'text' },
            { name: 'preferredDate', label: 'Preferred Date', type: 'date' },
            { name: 'preferredTime', label: 'Preferred Time', type: 'time' }
          ]
        };
        break;
      case 'find_hospitals':
        setCurrentForm('location');
        response = {
          role: 'assistant',
          content: "Please share your location to find nearby hospitals:",
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
      case 'main_menu':
        response = WELCOME_MESSAGE;
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

    let newMessages = [...messages];
    if (userMessage) newMessages = [...newMessages, userMessage];
    newMessages = [...newMessages, response];
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
            <label className="block text-sm font-medium text-[#8B7355]">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={formData[field.name as keyof FormData] || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full p-2 border border-[#8B7355]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40 bg-white text-[#4A4A4A]"
                rows={3}
                required
              />
            ) : (
              <input
                type={field.type}
                value={formData[field.name as keyof FormData] || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                className="w-full p-2 border border-[#8B7355]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B7355]/40 bg-white text-[#4A4A4A]"
                required
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#A67B5B] transition-colors"
        >
          Submit
        </button>
      </form>
    );
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const renderSurvey = () => {
    if (!showSurvey) return null;
    return (
      <div className="mt-4 p-4 bg-white border border-[#8B7355]/30 rounded-lg flex flex-col items-center">
        <div className="text-[#8B7355] font-medium mb-2">How would you rate your experience with our chatbot?</div>
        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map(star => (
            <button
              key={star}
              onClick={() => { setSurveyRating(star); setSurveySubmitted(true); setShowSurvey(false); }}
              className={`text-2xl focus:outline-none ${surveyRating && star <= surveyRating ? 'text-yellow-400' : 'text-gray-300'}`}
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              disabled={surveySubmitted}
            >
              ★
            </button>
          ))}
        </div>
        {surveySubmitted && (
          <div className="text-green-600 font-medium mt-2">Thank you for your feedback!</div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="bg-[#8B7355] hover:bg-[#A67B5B] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-105"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 h-[600px] bg-[#F5F5F0] rounded-lg shadow-xl flex flex-col overflow-hidden border border-[#8B7355]/20">
          {/* Header */}
          <div className="bg-[#8B7355] text-white p-4 flex justify-between items-center relative">
            <h3 className="font-medium">MediSync Assistant</h3>
            <div className="flex items-center gap-2">
              {/* Three Dots Menu */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((open) => !open)}
                  className="text-white/80 hover:text-white p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-white/40"
                  aria-label="Open menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    <circle cx="19" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-[#8B7355] rounded shadow-lg z-10 border border-[#8B7355]/20">
                    <button
                      onClick={handleRestartChat}
                      className="w-full text-left px-4 py-2 hover:bg-[#F5F5F0] rounded-t transition-colors"
                    >
                      Restart Chat
                    </button>
                  </div>
                )}
              </div>
              {/* Close Button */}
              <button
                onClick={toggleChat}
                className="text-white/80 hover:text-white transition-colors ml-1"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F5F0]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Assistant avatar */}
                {message.role !== 'user' && (
                  <BotAvatar />
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-[#8B7355] text-white'
                      : 'bg-white text-gray-800 border border-[#8B7355]/20'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.type === 'quick_reply' && message.quickReplies && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.quickReplies.map((reply, replyIndex) => (
                        <button
                          key={replyIndex}
                          onClick={() => handleQuickReply(reply.action)}
                          className="text-xs bg-[#8B7355] hover:bg-[#A67B5B] text-white px-3 py-1 rounded-full transition-colors shadow"
                        >
                          {reply.text}
                        </button>
                      ))}
                    </div>
                  )}
                  {renderForm(message)}
                </div>
                {/* User avatar */}
                {message.role === 'user' && (
                  <img
                    src={USER_AVATAR}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full ml-2 border border-[#8B7355]/30 bg-white"
                    style={{ minWidth: 32 }}
                  />
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-lg p-3 border border-[#8B7355]/20">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-[#8B7355] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            {renderSurvey()}
          </div>

          {/* Input */}
          <div className="p-4 bg-[#F5F5F0] border-t border-[#8B7355]/20">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border border-[#8B7355]/20 focus:outline-none focus:ring-2 focus:ring-[#8B7355]/50 bg-white text-gray-800"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-[#8B7355] hover:bg-[#A67B5B] text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 