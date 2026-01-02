import {useLocation, NavLink} from 'react-router';

import UnauthorizedHeader from '../components/UnauthorizedHeader';

export default function ErrorPage() {
  const location = useLocation();

  console.log(location.state);

  return (
    <main className="px-2 pb-2 container mx-auto">
      <UnauthorizedHeader />

      <section className="container-box max-w-140">
        <h1 className="font-bold text-2xl">Oops.</h1>

        <div className="text-center">
          <h2 className="mb-4 font-bold text-4xl">{location.state?.err?.status}</h2>

          {location.state?.err?.status === 404 && (
            <p>We couldn't find what you were looking for.</p>
          )}

          {location.state?.err?.status === 500 && <p>Server error</p>}
        </div>

        <NavLink to="/" className="simple-button button-gray">
          Let's go back
        </NavLink>
      </section>
    </main>
  );
}
