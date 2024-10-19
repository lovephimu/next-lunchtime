import { Meal } from '@/database/meals';
import { Sql } from 'postgres';

export const meals: Meal[] = [
  {
    id: 1,
    mealname: 'Chili con Carne',
    info: null,
    diet: null,
  },
  {
    id: 2,
    mealname: 'Chili sin Carne',
    info: 'done with Soy',
    diet: 'vegan',
  },
];

export async function up(sql: Sql) {
  for (const meal of meals) {
    await sql`
      INSERT INTO meals
      (mealname, info, diet)
      VALUES
      (${meal.mealname}, ${meal.info}, ${meal.diet})
    `;
  }
}

export async function down(sql: Sql) {
  for (const meal of meals) {
    await sql`
      DELETE FROM meals WHERE id = ${meal.id}
    `;
  }
}
