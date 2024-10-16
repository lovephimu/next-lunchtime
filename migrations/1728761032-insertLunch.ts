import { Lunch } from '@/database/database';
import { Sql } from 'postgres';

const lunches: Lunch[] = [
  {
    id: 1,
    mainId: 1,
    sideId: 1,
    dessertId: 1,
    timeStamp: '12.10.24',
  },
];

// INSERTING SIGHTING DATA

export async function up(sql: Sql) {
  for (const lunch of lunches) {
    await sql`
      INSERT INTO lunches
      (main_id, side_id, dessert_id, time_stamp )
      VALUES
      (${lunch.mainId}, ${lunch.sideId}, ${lunch.dessertId}, ${lunch.timeStamp})
    `;
  }
}

export async function down(sql: Sql) {
  for (const lunch of lunches) {
    await sql`
      DELETE FROM lunches WHERE id = ${lunch.id}
    `;
  }
}
