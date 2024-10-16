import { Sql } from 'postgres';
import { Meal } from '../database/database';

export const meals: Meal[] = [
  {
    id: 1,
    mealname: 'Chili con Carne',
    diet: null,
  },
  {
    id: 2,
    mealname: 'Chili sin Carne',
    diet: 'vegan',
  },
];

export async function up(sql: Sql) {
  for (const meal of meals) {
    await sql`
      INSERT INTO meals
      (mealname, diet)
      VALUES
      (${meal.mealname}, ${meal.diet})
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
