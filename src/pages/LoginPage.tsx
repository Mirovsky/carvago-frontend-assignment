import {FormEvent, useState} from 'react';
import {Navigate, useLocation, NavLink} from 'react-router';

import {useLoginMutation} from '../queries/login';
import {useMeQuery} from '../queries/me';
import UserForm from '../components/UserForm';

export default function LoginPage() {
  const loginMutation = useLoginMutation();
  const {data: me, isLoading} = useMeQuery();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const params = new URLSearchParams(location.search);
  const returnTo = params.get('returnTo') || '/';

  if (isLoading || me !== null) {
    return <Navigate to={returnTo} replace />;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    loginMutation.mutate({username, password});
  };

  return (
    <section className="mx-auto max-w-140 p-10 rounded-3xl bg-fill-white">
      <h1 className="mb-6 font-bold text-2xl">It’s good to have you back!</h1>
      <p className="mb-10 text-base text-secondary">
        Welcome to our secure portal! To access the full functionality of our app, kindly provide
        your credentials below. Your privacy is our priority.
      </p>

      <UserForm
        submitHandler={onSubmit}
        setUsernameHandler={setUsername}
        setPasswordHandler={setPassword}
        isPending={loginMutation.isPending}
        isError={loginMutation.isError}
        error={loginMutation.error as Error}
      />

      <p className="mt-6 text-sm text-secondary">
        Don't have an account yet?{' '}
        <NavLink className="underline hover:no-underline" to={`/register${location.search}`}>
          Sign Up
        </NavLink>
      </p>
    </section>
  );
}
