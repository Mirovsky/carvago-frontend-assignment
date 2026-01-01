import {Outlet} from 'react-router';
import UnauthorizedHeader from '../UnauthorizedHeader';

export default function UnauthorizedLayout() {
  return (
    <main className="container mx-auto">
      <UnauthorizedHeader />

      <Outlet />
    </main>
  );
}
