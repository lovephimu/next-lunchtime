import cx from 'classnames';
import { HTMLProps } from 'react';
import Container from '../Container';
import Icon from '../Icon';
import styles from './styles.module.css';

type Props = HTMLProps<HTMLDivElement> & {
  className?: string;
};

const LogoText = ({ className }: Props) => {
  return (
    <Container>
      <Icon aria-hidden size="medium" name="logo" />
      <div
        className={cx(styles.container, className, 'text-2xl font-semibold')}
      >
        LunchTime
      </div>
    </Container>
  );
};

export default LogoText;
