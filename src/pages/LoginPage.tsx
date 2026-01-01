import {Navigate, useLocation, NavLink} from 'react-router';

import {useMeQuery} from '../queries/me';
import UserForm from '../components/UserForm';

export default function LoginPage() {
  const {data: me, isLoading} = useMeQuery();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const returnTo = params.get('returnTo') || '/';

  if (isLoading || me !== null) {
    return <Navigate to={returnTo} replace />;
  }

  return (
    <section className="mx-auto max-w-140 p-10 rounded-3xl bg-fill-white">
      <h1 className="mb-6 font-bold text-2xl">It’s good to have you back!</h1>
      <p className="mb-10 text-base text-secondary">
        Welcome to our secure portal! To access the full functionality of our app, kindly provide
        your credentials below. Your privacy is our priority.
      </p>

      <UserForm actionLabel="Log in" />

      <p className="mt-6 text-sm text-secondary">
        Don't have an account yet?{' '}
        <NavLink className="underline hover:no-underline" to={`/register${location.search}`}>
          Sign Up
        </NavLink>
      </p>
    </section>
  );
}
