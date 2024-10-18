import sessionTest from '@/util/sessionTest';
import { HTMLProps, PropsWithChildren } from 'react';
import Container from '../Container';
import FormMiniLogin from '../FormMiniLogin';

type Props = HTMLProps<HTMLDivElement> & PropsWithChildren & {};

const Menu = async ({ children, ...htmlProps }: Props) => {
  const sessionResult = await sessionTest();

  return (
    <Container className="justify-end" {...htmlProps}>
      <FormMiniLogin session={sessionResult} />
      <nav>{children}</nav>
    </Container>
  );
};

export default Menu;
