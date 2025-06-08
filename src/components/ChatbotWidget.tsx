'use client'

import React, { useState, useRef, useEffect } from 'react'

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages((msgs) => [
      ...msgs,
      { from: 'user', text: input },
      { from: 'bot', text: "I'm a placeholder bot for now!" }
    ])
    setInput('')
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg bg-blue-600 text-white p-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Chatbot SVG Icon */}
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff" fillOpacity="0.15"/><rect x="7" y="8" width="10" height="6" rx="3" fill="currentColor"/><circle cx="10" cy="11" r="1" fill="#fff"/><circle cx="14" cy="11" r="1" fill="#fff"/></svg>
      </button>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-xs bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col animate-fade-in overflow-hidden border border-blue-100 dark:border-gray-800">
          <div className="flex items-center justify-between px-4 py-3 border-b border-blue-100 dark:border-gray-800 bg-blue-600 dark:bg-blue-800 text-white rounded-t-2xl">
            <span className="font-semibold">MediBot Assistant</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-xl hover:scale-110 transition-transform">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-blue-50 dark:bg-gray-950" style={{ height: 320 }}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === 'bot' ? 'text-left' : 'text-right'}>
                <span className={
                  'inline-block px-3 py-2 rounded-xl ' +
                  (msg.from === 'bot'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                    : 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100')
                }>
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            className="flex items-center gap-2 px-4 py-3 border-t border-blue-100 dark:border-gray-800 bg-white dark:bg-gray-900"
            onSubmit={e => { e.preventDefault(); sendMessage(); }}
          >
            <input
              className="flex-1 rounded-lg border border-blue-200 dark:border-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 font-semibold shadow"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
} 