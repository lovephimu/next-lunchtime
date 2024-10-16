import Key from '@/public/svg-components/Key';
import Lock from '@/public/svg-components/Lock';
import LockOpen from '@/public/svg-components/LockOpen';
import Xmark from '@/public/svg-components/Xmark';
import cx from 'classnames';
import { HTMLProps } from 'react';
import styles from './styles.module.css';

const icons = {
  key: Key,
  xmark: Xmark,
  lock: Lock,
  lockOpen: LockOpen,
};

type Props = HTMLProps<HTMLImageElement> & {
  name: keyof typeof icons;
  alt: string;
};

const Icon = ({ name, alt, className, ...htmlProps }: Props) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      className={cx(styles.container, className, 'm-2')}
      {...htmlProps}
      aria-label={alt}
    />
  );
};

export default Icon;
