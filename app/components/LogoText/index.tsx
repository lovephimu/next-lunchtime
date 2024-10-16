import cx from 'classnames';
import { HTMLProps } from 'react';
import styles from './styles.module.css';

type Props = HTMLProps<HTMLDivElement> & {
  className?: string;
};

const LogoText = ({ className }: Props) => {
  return (
    <div className={cx(styles.container, className, 'text-2xl font-semibold')}>
      LunchTime
    </div>
  );
};

export default LogoText;
