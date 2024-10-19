// GET

import { parseIntCheck } from '@/app/common/functions/parseIntCheck';
import { Error } from '@/app/common/types';
import {
  deleteMealById,
  getMealById,
  Meal,
  updateMealById,
} from '@/database/meals';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  mealId: string;
};

export type MealsResponseBodyGet =
  | {
      meal: Meal[];
    }
  | Error;

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
): Promise<NextResponse<MealsResponseBodyGet>> {
  // Extract params from context needs to be second parameter
  const { mealId } = params;
  const id = parseIntCheck(mealId);

  if (!id) {
    return NextResponse.json(
      { error: 'Invalid mealId, must be a valid number' },
      { status: 400 },
    );
  }

  const meal = await getMealById(id);

  if (!meal) {
    return NextResponse.json({ error: 'Lunch not found' }, { status: 404 });
  }

  return NextResponse.json({ meal });
}

// PUT

export async function PUT(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { mealId } = params;
  const id = parseIntCheck(mealId);

  // Validate the lunchId
  if (!id) {
    return NextResponse.json(
      { error: 'Invalid lunchId, must be a valid number' },
      { status: 400 },
    );
  }

  // Parse the request body (new lunch data)
  const body = await request.json();

  // Upate db entry
  const updatedMeal = await updateMealById(id, body);

  if (!updatedMeal) {
    return NextResponse.json(
      { error: 'Failed to update meal or meal not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({
    message: 'Meal updated successfully',
    lunch: updatedMeal,
  });
}

// DELETE

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { mealId } = params;
  const id = parseIntCheck(mealId);

  // Validate the lunchId
  if (!id) {
    return NextResponse.json(
      { error: 'Invalid mealId, must be a valid number' },
      { status: 400 },
    );
  }

  // Attempt to delete the lunch
  const deletedLunch = await deleteMealById(id);

  if (!deletedLunch) {
    return NextResponse.json(
      { error: 'Meal not found or failed to delete' },
      { status: 404 },
    );
  }

  return NextResponse.json({ message: 'Lunch deleted successfully' });
}
