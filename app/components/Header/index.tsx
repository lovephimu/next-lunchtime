import { HTMLProps, PropsWithChildren } from 'react';
import LogoText from '../LogoText';
import styles from './styles.module.css';

type Props = HTMLProps<HTMLDivElement> &
  PropsWithChildren & {
    className?: string;
  };

const Header = ({ className, children, ...htmlProps }: Props) => {
  return (
    <header className={styles.container} {...htmlProps}>
      {children}
    </header>
  );
};

export default Header;
