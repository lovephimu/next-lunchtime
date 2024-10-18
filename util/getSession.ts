import { cookies } from 'next/headers';

const getSession = async () => {
  const sessionTokenCookie = cookies().get('sessionToken');

  return { token: sessionTokenCookie?.value };
};

export default getSession;
