import { Sql } from 'postgres';
import { User } from '../database/database';

export const users: User[] = [
  {
    id: 1,
    username: 'lunchtimer',
    passwordHash: process.env.USERPW as string,
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
      INSERT INTO users
      (username, password_hash)
      VALUES
      (${user.username}, ${user.passwordHash})
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users WHERE id = ${user.id}
    `;
  }
}
