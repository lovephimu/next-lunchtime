import { parseIntCheck } from '@/app/common/functions/parseIntCheck';
import { Error } from '@/app/common/types';
import {
  deleteLunchById,
  getLunchWithMealNamesById,
  Lunch,
  updateLunchById,
} from '@/database/lunches';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
  lunchId: string;
};

export type LunchResponseBodyGet =
  | {
      lunch: Lunch[];
    }
  | Error;

// GET

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
): Promise<NextResponse<LunchResponseBodyGet>> {
  // Extract params from context needs to be second parameter
  const { lunchId } = params;
  const id = parseIntCheck(lunchId);

  if (!id) {
    return NextResponse.json(
      { error: 'Invalid lunchId, must be a valid number' },
      { status: 400 },
    );
  }

  const lunch = await getLunchWithMealNamesById(id);

  if (!lunch) {
    return NextResponse.json({ error: 'Lunch not found' }, { status: 404 });
  }

  return NextResponse.json({ lunch });
}

// PUT

export async function PUT(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { lunchId } = params;
  const id = parseIntCheck(lunchId);

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
  const updatedLunch = await updateLunchById(id, body);

  if (!updatedLunch) {
    return NextResponse.json(
      { error: 'Failed to update lunch or lunch not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({
    message: 'Lunch updated successfully',
    lunch: updatedLunch,
  });
}

// DELETE

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { lunchId } = params;
  const id = parseIntCheck(lunchId);

  // Validate the lunchId
  if (!id) {
    return NextResponse.json(
      { error: 'Invalid lunchId, must be a valid number' },
      { status: 400 },
    );
  }

  // Attempt to delete the lunch
  const deletedLunch = await deleteLunchById(id);

  if (!deletedLunch) {
    return NextResponse.json(
      { error: 'Lunch not found or failed to delete' },
      { status: 404 },
    );
  }

  return NextResponse.json({ message: 'Lunch deleted successfully' });
}
