import cx from 'classnames';
import { HTMLProps, PropsWithChildren } from 'react';
import styles from './styles.module.css';

type Props = HTMLProps<HTMLDivElement> &
  PropsWithChildren & {
    direction?: 'row' | 'column';
    between?: 'left' | 'right';
  };

const Container = ({
  direction = 'row',
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
