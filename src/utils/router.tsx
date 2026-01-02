import {createBrowserRouter, Navigate} from 'react-router';

import {requireAuthLoader} from '../loaders/requireAuthLoader';
import {todoLoader} from '../loaders/todoLoader';

import {newTodoAction} from '../actions/newTodoAction';
import {editTodoAction} from '../actions/editTodoAction';

import ErrorBoundary from '../components/ErrorBoundary';
import UnauthorizedLayout from '../components/layouts/UnauthorizedLayout';
import AuthorizedLayout from '../components/layouts/AuthorizedLayout';

import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ErrorPage from '../pages/ErrorPage';
import AddTodoPage from '../pages/AddTodoPage';
import EditTodoPage from '../pages/EditTodoPage';
import {registerAction} from '../actions/registerAction';
import {loginAction} from '../actions/loginAction';

export const router = createBrowserRouter([
  {path: '/error', element: <ErrorPage />},
  {
    element: <UnauthorizedLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: '/register',
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
    ],
  },
  {
    element: <AuthorizedLayout />,
    errorElement: <ErrorBoundary />,
    loader: requireAuthLoader,
    children: [
      {
        path: '/',
        element: <IndexPage />,
      },
      {
        path: '/todo/new',
        action: newTodoAction,
        element: <AddTodoPage />,
      },
      {
        path: '/todo/:id',
        loader: todoLoader,
        action: editTodoAction,
        element: <EditTodoPage />,
      },
    ],
  },
]);
