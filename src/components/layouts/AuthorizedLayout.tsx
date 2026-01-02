import {Outlet} from 'react-router';
import AuthorizedHeader from '../AuthorizedHeader';

export default function AuthorizedLayout() {
  return (
    <main className="px-2 container mx-auto">
      <AuthorizedHeader />

      <Outlet />
    </main>
  );
}
