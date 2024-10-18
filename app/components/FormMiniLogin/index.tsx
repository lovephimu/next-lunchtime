'use client';

import { LoginResponseBodyPost } from '@/app/api/(auth)/login/route';
import cx from 'classnames';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import { HTMLAttributes, useState } from 'react';
import Button from '../Button';
import Container from '../Container';
import Icon from '../Icon';
import Input from '../Input';
import styles from './styles.module.css';

enum InputField {
  username = 'username',
  password = 'password',
}

type Props = HTMLAttributes<HTMLFormElement> & { session?: boolean };

const FormMiniLogin = ({ session, ...hmtlProps }: Props) => {
  const [visibility, setVisibility] = useState(false);
  const [sessionProp, setSessionProp] = useState(session);
  const [input, setInput] = useState<Partial<Record<InputField, string>>>({});
  const [error, setError] = useState('');
  const router = useRouter();

  const login = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }

    setSessionProp(true);

    router.push('/login' as Route);

    router.refresh();
  };

  const logout = async () => {
    const response = await fetch('/api/login', {
      method: 'DELETE',
    });
    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      console.log(data.error);
      return;
    }

    setSessionProp(false);
  };

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const field = e.currentTarget.name as InputField;
    const value = e.currentTarget.value;

    setInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    login();
  };

  const delays = visibility
    ? [styles.delay2, styles.delay1, styles.delay0]
    : [styles.delay0, styles.delay1, styles.delay2];

  const disabled = !visibility || sessionProp;
  const animate = visibility && !sessionProp;

  return (
    <Container>
      <form
        className={styles.content}
        onSubmit={(event) => event.preventDefault()}
      >
        <Input
          name="username"
          value={input.username || ''}
          className={cx(styles.hidden, delays[0], {
            [styles.animate]: animate,
          })}
          label="Username"
          disabled={disabled}
          onChange={handleInput}
        />
        <Input
          name="password"
          value={input.password || ''}
          className={cx(styles.hidden, delays[1], {
            [styles.animate]: animate,
          })}
          label="Password"
          type="password"
          disabled={disabled}
          onChange={handleInput}
        />
        <Button
          className={cx(styles.hidden, delays[2], {
            [styles.animate]: visibility,
          })}
          disabled={!visibility}
          as="button"
          label={sessionProp ? 'Logout' : 'Login'}
          onClick={sessionProp ? logout : login}
        />
      </form>
      <Button
        aria-label="Log into account"
        variant="icon"
        onClick={() => {
          setVisibility(!visibility);
        }}
      >
        {sessionProp ? (
          <Icon name="lock" alt="Close login" /> //visibility false + session false
        ) : visibility ? (
          <Icon name="xmark" alt="Close login" />
        ) : (
          <Icon name="key" alt="Login" />
        )}
      </Button>
    </Container>
  );
};

export default FormMiniLogin;
