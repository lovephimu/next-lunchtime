import { Sql } from 'postgres';

// LUNCH TABLE

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE lunches (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      main_id integer NOT NULL,
      dessert_id integer NOT NULL,
      side_id integer NOT NULL,
      FOREIGN KEY (main_id) REFERENCES meals (id) ON DELETE SET NULL,
      FOREIGN KEY (side_id) REFERENCES meals (id) ON DELETE SET NULL,
      FOREIGN KEY (dessert_id) REFERENCES meals (id) ON DELETE SET NULL,
      time_stamp text
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE lunches
  `;
}
