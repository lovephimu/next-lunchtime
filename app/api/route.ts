import { NextResponse } from 'next/server';

export function GET(): NextResponse<{ meals: string }> {
  return NextResponse.json({
    meals: '/api/meals',
    lunches: '/api/lunches',
  });
}
