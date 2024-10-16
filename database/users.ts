import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

// USER methods
// USER GET

export const getUsers = cache(async () => {
  const [users] = await sql<User[]>`
    SELECT * FROM users
  `;
  return users;
});

export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id, username
    FROM
      users
    WHERE
      users.username = ${username.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
    SELECT * FROM
    users
    WHERE
    users.username = ${username.toLowerCase()}
  `;
    return user;
  },
);

// USER POST

export const createUser = cache(
  async (username: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
  INSERT INTO users
    (username, password_hash)
  VALUES
  (${username.toLowerCase()}, ${passwordHash})
  RETURNING
  id,
  username
  `;

    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.username
  FROM
    users
  INNER JOIN
    sessions ON (
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > NOW()
    )
  `;

  return user;
});
