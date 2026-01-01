import {useState} from 'react';

import IconHide from '@assets/icons/icon-hide.svg?react';
import IconShow from '@assets/icons/icon-show.svg?react';
import IconForward from '@assets/icons/icon-forward.svg?react';

import Input from '../components/simple/Input';

type UserFormProps = {
  submitHandler: (e: React.FormEvent) => void;
  setUsernameHandler: (v: string) => void;
  setPasswordHandler: (v: string) => void;
  isPending: boolean;
  isError: boolean;
  error: Error;
};

export default function UserForm({
  submitHandler,
  setUsernameHandler,
  setPasswordHandler,
  isPending,
  isError,
  error,
}: UserFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordHandler = (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordVisible(!passwordVisible);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={submitHandler}>
      <Input
        id="username"
        label="Username"
        type="text"
        required
        changeHandler={setUsernameHandler}
      />
      <div className="relative">
        <Input
          id="password"
          label="Password"
          type={passwordVisible ? 'text' : 'password'}
          required
          changeHandler={setPasswordHandler}
        />
        <button
          className="p-4 absolute bottom-0 right-0 hover:cursor-pointer"
          onClick={togglePasswordHandler}
          tabIndex={-1}
        >
          {passwordVisible && <IconShow />}
          {!passwordVisible && <IconHide />}
        </button>
      </div>

      {isError && <p>{error.message}</p>}

      <button type="submit" disabled={isPending} className="simple-button">
        {isPending ? 'Logging in...' : 'Log In'} <IconForward />
      </button>
    </form>
  );
}
