import Key from '@/public/svg-components/Key';
import Lock from '@/public/svg-components/Lock';
import LockOpen from '@/public/svg-components/LockOpen';
import Logo from '@/public/svg-components/Logo';
import Xmark from '@/public/svg-components/Xmark';
import cx from 'classnames';
import { HTMLProps, SVGProps } from 'react';
import styles from './styles.module.css';

const icons = {
  key: Key,
  xmark: Xmark,
  lock: Lock,
  lockOpen: LockOpen,
  logo: Logo,
};

type Props = Omit<SVGProps<SVGSVGElement>, 'alt' | 'size'> & {
  name: keyof typeof icons;
  size?: 'small' | 'medium' | 'large';
} & (
    | { alt: string; 'aria-hidden'?: false }
    | { alt?: undefined; 'aria-hidden': true }
  );

const Icon = ({
  name,
  size = 'small',
  alt,
  className,
  ...htmlProps
}: Props) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      className={cx(styles.container, styles[size], className, 'm-2')}
      {...htmlProps}
      aria-label={alt}
    />
  );
};

export default Icon;
