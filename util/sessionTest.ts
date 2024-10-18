import { getUserBySessionToken } from '@/database/users';
import { cookies } from 'next/headers';

const sessionTest = async () => {
  const sessionTokenCookie = cookies().get('sessionToken');

  const session =
    sessionTokenCookie &&
    (await getUserBySessionToken(sessionTokenCookie.value));

  return session ? true : false;
};

export default sessionTest;
