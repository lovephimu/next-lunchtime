import sessionTest from '@/util/sessionTest';
import Link from 'next/link';
import { HTMLProps, PropsWithChildren } from 'react';
import Container from '../Container';
import FormMiniLogin from '../FormMiniLogin';
import LogoText from '../LogoText';

type Props = HTMLProps<HTMLDivElement> & PropsWithChildren & {};

const Menu = async ({ children, ...htmlProps }: Props) => {
  const sessionResult = await sessionTest();

  return (
    <Container className="justify-between" {...htmlProps}>
      <Container>
        <Link href="/">
          <Container direction="column" gap="large">
            <LogoText />
          </Container>
        </Link>
      </Container>
      <FormMiniLogin session={sessionResult} />
      {children && <nav>{children}</nav>}
    </Container>
  );
};

export default Menu;
