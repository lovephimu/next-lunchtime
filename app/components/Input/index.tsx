import cx from 'classnames';
import { HTMLProps } from 'react';
import styles from './styles.module.css';

type Props = HTMLProps<HTMLInputElement> & {
  label: string;
};

const Input = ({ label, className, ...htmlProps }: Props) => {
  return (
    <input
      className={cx(styles.container, className, 'm-2 text-sm')}
      placeholder={label}
      {...htmlProps}
    />
  );
};

export default Input;
