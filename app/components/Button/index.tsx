import cx from 'classnames';
import Link from 'next/link';
import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import styles from './styles.module.css';

// Enforce that either 'label' or 'aria-label' must be provided
type LabelProps =
  | { label: ReactNode; 'aria-label'?: never }
  | { 'aria-label': string; label?: never };

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren &
  LabelProps & {
    as?: 'button' | 'link'; // Prop to define the wrapping element
    href?: string; // The 'to' prop for <Link>, only needed if 'as' is 'link'
    className?: string;
    variant?: 'text' | 'icon';
  };

const Button = ({
  as,
  href,
  label,
  variant = 'text',
  children,
  className,
  ...htmlProps
}: Props) => {
  const Element: React.ElementType = as === 'link' ? Link : 'button';
  return (
    <Element
      className={cx(styles.container, className, 'm-2 text-sm', {
        [styles.border]: variant === 'text',
      })}
      {...(as === 'link' ? { href } : {})}
      {...htmlProps}
    >
      {label ? label : children}
    </Element>
  );
};

export default Button;
