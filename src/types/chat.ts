export interface Message {
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'quick_reply' | 'form';
  quickReplies?: QuickReply[];
  formFields?: FormField[];
}

export interface QuickReply {
  text: string;
  action: 'book_appointment' | 'find_hospitals' | 'fill_form' | 'general_query';
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'time' | 'textarea';
}

export interface SessionData {
  sessionId: string;
  lastActive: number;
  messages: Message[];
} 