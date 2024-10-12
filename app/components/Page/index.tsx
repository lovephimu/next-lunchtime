import cx from 'classnames';
import { HTMLProps, PropsWithChildren } from 'react';
import styles from './styles.module.css';

type Props = HTMLProps<HTMLDivElement> &
  PropsWithChildren & {
    className?: string;
  };

const Page = ({ className, children }: Props) => {
  return <main className={cx(styles.container, className)}>{children}</main>;
};

export default Page;
