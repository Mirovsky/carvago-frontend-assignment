import {useState} from 'react';
import {Form} from 'react-router';

import IconHide from '@assets/icons/icon-hide.svg?react';
import IconShow from '@assets/icons/icon-show.svg?react';
import IconForward from '@assets/icons/icon-forward.svg?react';

import Input from '../components/simple/Input';
import {spawn} from 'child_process';

type UserFormProps = {
  actionLabel: string;
  actionData: any;
};

export default function UserForm({actionLabel, actionData}: UserFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordHandler = (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordVisible(!passwordVisible);
  };

  return (
    <Form method="post" className="flex flex-col gap-6">
      <Input id="username" label="Username" type="text" required />
      <div className="relative">
        <Input
          id="password"
          label="Password"
          type={passwordVisible ? 'text' : 'password'}
          required
        />
        <button
          type="button"
          className="p-4 absolute bottom-0 right-0 hover:cursor-pointer"
          onClick={togglePasswordHandler}
          tabIndex={-1}
        >
          {passwordVisible && <IconShow />}
          {!passwordVisible && <IconHide />}
        </button>
      </div>

      <button type="submit" className="simple-button button-blue">
        {actionLabel} <IconForward />
      </button>

      {actionData && <p className="text-center text-sm text-danger">{actionData?.formError}</p>}
    </Form>
  );
}
