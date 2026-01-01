import {Outlet} from 'react-router';
import AuthorizedHeader from '../AuthorizedHeader';

export default function AuthorizedLayout() {
  return (
    <main className="container mx-auto">
      <AuthorizedHeader />

      <Outlet />
    </main>
  );
}
