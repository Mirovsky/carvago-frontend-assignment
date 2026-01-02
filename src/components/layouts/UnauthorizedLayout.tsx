import {Outlet} from 'react-router';
import UnauthorizedHeader from '../UnauthorizedHeader';

export default function UnauthorizedLayout() {
  return (
    <main className="px-2 pb-2 container mx-auto">
      <UnauthorizedHeader />

      <Outlet />
    </main>
  );
}
