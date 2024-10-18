import cx from 'classnames';
import { HTMLProps, PropsWithChildren } from 'react';
import styles from './styles.module.css';

type Props = HTMLProps<HTMLDivElement> &
  PropsWithChildren & {
    direction?: 'row' | 'column';
    justify?: 'left' | 'center' | 'right';
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
  justify = 'right',
  between,
  children,
  className,
  ...htmlProps
}: Props) => {
  return (
    <div
      className={cx(
        styles.flex,
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
