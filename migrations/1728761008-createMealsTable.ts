import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE meals (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      mealname varchar(100) NOT NULL,
      info varchar(100) NULL,
      diet varchar(20) NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE meals
  `;
}
