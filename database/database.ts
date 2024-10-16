import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
};

export type Meal = {
  id: number;
  mealname: string;
  diet: 'vegan' | 'vegetarian' | null;
};

export type Lunch = {
  id: number;
  mainId: number;
  sideId: number;
  dessertId: number;
  timeStamp: string | null;
};

// chat types

export type Message = {
  id: number;
  messageText: string;
  chatUser: string;
};

export type Error = {
  error: string;
};

// GET messages

export const getMessages = cache(async () => {
  const messages = await sql<Message[]>`
  SELECT * FROM messages
  ORDER BY id ASC
  `;
  return messages;
});

export const getMessageById = cache(async (id: number) => {
  const [message] = await sql<Message[]>`
  SELECT * FROM messages
  WHERE id = ${id}
  `;
  return message;
});

// POST messages

export const createMessage = cache(
  async (messageText: string, chatUser: string) => {
    const [message] = await sql<Message[]>`
    INSERT INTO messages
    (message_text, chat_user)
    VALUES (${messageText}, ${chatUser})
    RETURNING *
  `;
    return message;
  },
);
//id, message_text, chat_user
// DELETE messages

export const deleteMessagesById = cache(async (id: number) => {
  const [message] = await sql<{ id: number }[]>`
    DELETE from messages WHERE messages.id = ${id}
    RETURNING id
    `;
  return message;
});
