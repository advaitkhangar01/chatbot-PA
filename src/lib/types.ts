export type Message = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

export type Reminder = {
  id?: string;
  text: string;
  dateTime: string; // ISO string
  recipient: string;
  status: 'pending' | 'sent';
};
