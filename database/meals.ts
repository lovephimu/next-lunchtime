import { cache } from 'react';
import { sql } from './connect';

export type MealInput = {
  mealname: string;
  info: string | null;
  diet: 'vegan' | 'vegetarian' | null;
};

export type Meal = MealInput & {
  id: number;
};

// GET all meals

export const getMeals = cache(async () => {
  const meals = await sql<Meal[]>`
    SELECT * FROM meals
    ORDER BY id ASC
  `;
  return meals;
});

// GET meal by id

export const getMealById = cache(async (id: number) => {
  const meal = await sql<Meal[]>`
    SELECT * FROM meals
    WHERE id = ${id}
  `;
  return meal;
});

// POST meal

export const createMeal = cache(async (mealInput: MealInput) => {
  const [meal] = await sql<Meal[]>`
    INSERT INTO meals
    (mealname, info, diet)
    VALUES (${mealInput.mealname}, ${mealInput.info}, ${mealInput.diet})
    RETURNING *
  `;
  return meal;
});

// PUT meal

export const updateMealById = cache(
  async (id: number, mealInput: MealInput) => {
    const [updatedMeal] = await sql<Meal[]>`
    UPDATE meals
    SET
      mealname = ${mealInput.mealname},
      info = ${mealInput.info},
      diet = ${mealInput.diet}
    WHERE id = ${id}
    RETURNING *
  `;

    return updatedMeal;
  },
);

// DELETE meal

export async function deleteMealById(id: number) {
  const [deletedMeal] = await sql<Meal[]>`
    DELETE FROM meals
    WHERE id = ${id}
    RETURNING *
  `;

  return deletedMeal;
}
