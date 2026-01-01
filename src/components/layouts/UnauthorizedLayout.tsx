import {Outlet} from 'react-router';

export default function UnauthorizedLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
