import cx from 'classnames';
import Link from 'next/link';
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import styles from './styles.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren & {
    as?: 'button' | 'link'; // Prop to define the wrapping element
    href?: string; // The 'to' prop for <Link>, only needed if 'as' is 'link'
    label: ReactNode;
    className?: string;
  };

const Button = ({ as, href, label, children, className, ...props }: Props) => {
  const Element: React.ElementType = as === 'link' ? Link : 'button';
  return (
    <Element
      className={cx(styles.container, className, 'p-2 text-sm')}
      {...(as === 'link' ? { href } : {})}
      {...props}
    >
      {label}
    </Element>
  );
};

export default Button;
