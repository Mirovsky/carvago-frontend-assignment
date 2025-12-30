import { Navigate, useLocation } from 'react-router'

import { useMeQuery } from '../queries/me'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: me, isLoading, isError } = useMeQuery()
  const loc = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <Navigate to="/error" replace />;
  }
  if (!me) {
    return <Navigate to={`/login?returnTo=${encodeURIComponent(loc.pathname)}`} replace />;
  }

  return <>{children}</>
}