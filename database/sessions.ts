import { cache } from 'react';
import { sql } from './connect';

export type Session = {
  id: number;
  token: string;
  userId: number;
};

// SESSION methods
// SESSION GET

export const getValidSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
  SELECT
      sessions.id,
      sessions.token
    FROM
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
  `;
  return session;
});

// SESSION POST

export const createSession = cache(async (token: string, userId: number) => {
  const [session] = await sql<Session[]>`
  INSERT INTO sessions
    (token, user_id)
  VALUES
    (${token},${userId})
  RETURNING
    id,
    token,
    user_id
  `;

  // delete expired sessions

  await deleteExpiredSessions();

  return session;
});

export const deleteSession = cache(async (token: string, userId: number) => {
  const [session] = await sql<{ id: number; token: string }[]>`
  DELETE FROM
    sessions
  WHERE
    sessions.token = ${token}
  RETURNING
    id,
    token
  `;
  return session;
});

// SESSION DELETE

export const deleteExpiredSessions = cache(async () => {
  await sql`
  DELETE FROM
    sessions
  WHERE
    expiry_timestamp < NOW()
  `;
});

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
DELETE FROM
  sessions
WHERE
  sessions.token = ${token}
RETURNING
  id,
  token
  `;

  return session;
});
