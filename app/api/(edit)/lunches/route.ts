// GET ALL

import { Error } from '@/app/common/types';
import {
  createLunch,
  getLunchesWithMealNames,
  Lunch,
} from '@/database/lunches';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export type LunchResponseBodyGetAll =
  | {
      lunches: Lunch[];
    }
  | Error;

export type LunchResponseBodyPost =
  | {
      lunch: Lunch;
    }
  | Error;

// Schemas

const lunchSchema = z.object({
  mainId: z.number(),
  dessertId: z.number().nullable(),
  sideId: z.number().nullable(),
  timeStamp: z.string(),
});

// GET ALL

export async function GET(): Promise<NextResponse<LunchResponseBodyGetAll>> {
  const lunches = await getLunchesWithMealNames();
  return NextResponse.json({ lunches });
}

// POST

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LunchResponseBodyPost>> {
  const body = await request.json();

  // 1. Test user input

  const testedInput = lunchSchema.safeParse(body);

  if (!testedInput.success) {
    return NextResponse.json(
      {
        error: testedInput.error,
      },
      { status: 400 },
    );
  }

  // 4. Save new lunch

  const lunch = await createLunch(testedInput.data);

  if (!lunch) {
    return NextResponse.json(
      {
        error: 'Error creating the new lunch',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    lunch,
  });
}
