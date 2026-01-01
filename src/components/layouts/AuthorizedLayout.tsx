import {Outlet} from 'react-router';

export default function AuthorizedLayout() {
  return (
    <main className="bg-fill-gray-lightest">
      <Outlet />
    </main>
  );
}
