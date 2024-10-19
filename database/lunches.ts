import { cache } from 'react';
import { sql } from './connect';

export type LunchInput = {
  mainId: number;
  sideId: number | null;
  dessertId: number | null;
  timeStamp: string | null;
};

export type Lunch = LunchInput & {
  id: number;
};

// GET all lunches

export const getLunches = cache(async () => {
  const lunches = await sql<Lunch[]>`
    SELECT * FROM lunches
    ORDER BY id ASC
  `;
  return lunches;
});

export const getLunchesWithMealNames = cache(async () => {
  const lunches = await sql<Lunch[]>`
    SELECT
      lunches.id,
      main_meal.mealname AS "mainMealName",
      side_meal.mealname AS "sideMealName",
      dessert_meal.mealname AS "dessertMealName",
      lunches.time_stamp
    FROM lunches
    LEFT JOIN meals AS main_meal ON main_meal.id = lunches.main_id
    LEFT JOIN meals AS side_meal ON side_meal.id = lunches.side_id
    LEFT JOIN meals AS dessert_meal ON dessert_meal.id = lunches.dessert_id
  `;
  return lunches;
});

// GET lunch by id

export const getLunch = cache(async (id: number) => {
  const lunch = await sql<Lunch[]>`
    SELECT * FROM lunches
    WHERE id = ${id}
  `;
  return lunch;
});

export const getLunchWithMealNamesById = cache(async (id: number) => {
  const lunch = await sql<Lunch[]>`
    SELECT
      lunches.id,
      main_meal.mealname AS "mainMealName",
      side_meal.mealname AS "sideMealName",
      dessert_meal.mealname AS "dessertMealName",
      lunches.time_stamp
    FROM lunches
    LEFT JOIN meals AS main_meal ON main_meal.id = lunches.main_id
    LEFT JOIN meals AS side_meal ON side_meal.id = lunches.side_id
    LEFT JOIN meals AS dessert_meal ON dessert_meal.id = lunches.dessert_id
    WHERE lunches.id = ${id}
  `;
  return lunch;
});

// POST lunch

export const createLunch = cache(async (lunchInput: LunchInput) => {
  const [lunch] = await sql<Lunch[]>`
    INSERT INTO lunches
    (main_id, side_id, dessert_id, time_stamp)
    VALUES (${lunchInput.mainId}, ${lunchInput.dessertId}, ${lunchInput.sideId}, ${lunchInput.timeStamp})
    RETURNING *
  `;
  return lunch;
});

// PUT lunch

export const updateLunchById = cache(
  async (id: number, lunchInput: LunchInput) => {
    const [updatedLunch] = await sql<Lunch[]>`
    UPDATE lunches
    SET
      main_id = ${lunchInput.mainId},
      side_id = ${lunchInput.sideId},
      dessert_id = ${lunchInput.dessertId},
      time_stamp = ${lunchInput.timeStamp}
    WHERE id = ${id}
    RETURNING *
  `;

    return updatedLunch;
  },
);

// DELETE lunch

export async function deleteLunchById(id: number) {
  const [deletedLunch] = await sql<Lunch[]>`
    DELETE FROM lunches
    WHERE id = ${id}
    RETURNING *
  `;

  return deletedLunch;
}
