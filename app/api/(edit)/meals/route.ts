import { nonEmptyString } from '@/app/common/schemas/zod';
import { Error } from '@/app/common/types';
import { createMeal, getMeals, Meal } from '@/database/meals';
import { NextRequest, NextResponse } from 'next/server';
import z, { ZodError } from 'zod';

export type MealsResponseBodyGetAll =
  | {
      meals: Meal[];
    }
  | Error;

export type MealsResponseBodyPost =
  | {
      meal: Meal;
    }
  | Error;

// Schemas

const mealSchema = z.object({
  mealname: nonEmptyString,
  info: nonEmptyString.nullable(),
  diet: z.union([z.literal('vegan'), z.literal('vegetarian'), z.null()]), // Ensure diet is "vegan", "vegetarian", or null
});

// GET ALL

export async function GET(): Promise<NextResponse<MealsResponseBodyGetAll>> {
  const meals = await getMeals();
  return NextResponse.json({ meals });
}

// POST

export async function POST(
  request: NextRequest,
): Promise<NextResponse<MealsResponseBodyPost>> {
  const body = await request.json();

  // 1. Test user input

  const testedInput = mealSchema.safeParse(body);

  if (!testedInput.success) {
    return NextResponse.json(
      {
        error: testedInput.error,
      },
      { status: 400 },
    );
  }

  // 4. Save new meal

  const meal = await createMeal(testedInput.data);

  if (!meal) {
    return NextResponse.json(
      {
        error: 'Error creating the new meal',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    meal,
  });
}
