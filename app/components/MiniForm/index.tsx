'use client';

import cx from 'classnames';
import { useState } from 'react';
import Button from '../Button';
import Container from '../Container';
import Icon from '../Icon';
import Input from '../Input';
import styles from './styles.module.css';

const MiniForm = () => {
  const [visibility, setVisibility] = useState(false);

  const delays = visibility
    ? [styles.delay2, styles.delay1, styles.delay0]
    : [styles.delay0, styles.delay1, styles.delay2];

  return (
    <Container between="right">
      <form className={styles.content} action="">
        <Input
          className={cx(styles.hidden, delays[0], {
            [styles.animate]: visibility,
          })}
          label="Username"
          disabled={!visibility}
        />
        <Input
          className={cx(styles.hidden, delays[1], {
            [styles.animate]: visibility,
          })}
          label="Password"
          type="password"
          disabled={!visibility}
        />
        <Button
          className={cx(styles.hidden, delays[2], {
            [styles.animate]: visibility,
          })}
          disabled={!visibility}
          as="link"
          label="Login"
          href="/login"
        />
      </form>
      <Button
        aria-label="Log into account"
        variant="icon"
        onClick={() => {
          setVisibility(!visibility);
        }}
      >
        {visibility ? (
          <Icon name="xmark" alt="Close login" />
        ) : (
          <Icon name="key" alt="Login" />
        )}
      </Button>
    </Container>
  );
};

export default MiniForm;
