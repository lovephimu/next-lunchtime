import cx from 'classnames';
import { HTMLProps, PropsWithChildren } from 'react';
import styles from './styles.module.css';

type Props = HTMLProps<HTMLDivElement> &
  PropsWithChildren & {
    direction?: 'row' | 'column';
    between?: 'left' | 'right';
    gap?: 'small' | 'medium' | 'large';
  };

enum Gap {
  small = 'gap-sm',
  medium = 'gap-md',
  large = 'gap-lg',
}

const Container = ({
  direction = 'row',
  gap = 'small',
  between,
  children,
  className,
  ...htmlProps
}: Props) => {
  return (
    <div
      className={cx(
        styles.container,
        styles[direction],
        styles[Gap[gap]],
        { [styles['space-between-right']]: between === 'right' },
        className,
      )}
      {...htmlProps}
    >
      {children}
    </div>
  );
};

export default Container;
