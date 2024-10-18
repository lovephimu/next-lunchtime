import crypto from 'node:crypto';
import { createSession, deleteSessionByToken } from '@/database/sessions';
import { getUserWithPasswordHashByUsername, User } from '@/database/users';
import { secureCookieOptions } from '@/util/cookies';
import getSession from '@/util/getSession';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

type Error = {
  error: string;
};

export type LoginResponseBodyPost =
  | {
      user: User;
    }
  | Error;

export type LogoutResponseBodyPost =
  | {
      tokenInfo: {
        id: number;
        token: string;
      };
    }
  | Error;

// test schema for user input

const userSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const tokenSchema = z.object({
  token: z.string().min(1),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  const body = await request.json();

  // 1. test user input

  const inputTested = userSchema.safeParse(body);

  // 2. verify that username and password are not missing else throw error

  if (!inputTested.success) {
    return NextResponse.json(
      {
        error: 'username or password missing',
      },
      {
        status: 400,
      },
    );
  }

  // 3. compare user credentials with input

  const userWithPasswordHash = await getUserWithPasswordHashByUsername(
    inputTested.data.username,
  );

  // 4. check if there was a valid response

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { error: 'user or password not valid' },
      { status: 401 },
    );
  }

  // 5. hash user input password

  const isPasswordValid = await bcrypt.compare(
    inputTested.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: 'user or password not valid' },
      { status: 401 },
    );
  }

  // At this point user is authenticated

  // 4. Create a token

  const token = crypto.randomBytes(100).toString('base64');

  // 5. Create the session record

  const session = await createSession(token, userWithPasswordHash.id);

  if (!session) {
    return NextResponse.json(
      {
        error: 'Error creating the new session',
      },
      { status: 500 },
    );
  }

  // 6. Create a new cookie

  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json(
    {
      user: {
        username: userWithPasswordHash.username,
        id: userWithPasswordHash.id,
      },
    },
    {
      status: 200,
    },
  );
}

export async function DELETE(): Promise<NextResponse<LogoutResponseBodyPost>> {
  // 1. get user token

  const token = await getSession();

  // 2. check token

  const inputTested = tokenSchema.safeParse(token);

  // 2. verify that username and password are not missing else throw error

  if (!inputTested.success) {
    return NextResponse.json(
      {
        error: 'token invalid',
      },
      {
        status: 400,
      },
    );
  }

  // 3. delete user token

  const deletedToken = await deleteSessionByToken(inputTested.data.token);

  // 4. Delete cookie

  cookies().delete('sessionToken');

  return NextResponse.json(
    {
      tokenInfo: {
        id: deletedToken.id,
        token: deletedToken.token,
      },
    },
    {
      status: 200,
    },
  );
}
