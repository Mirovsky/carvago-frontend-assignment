import {useEffect} from 'react';
import {useNavigate, useRouteError, useLocation} from 'react-router';

export default function ErrorBoundary() {
  const err = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(err);

  useEffect(() => {
    navigate('/error', {replace: true, state: {err}});
  }, [err, navigate, location.pathname, location.search]);

  return null;
}
