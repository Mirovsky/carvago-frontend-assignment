import {createBrowserRouter, Navigate} from 'react-router';

import {requireAuthLoader} from '../loaders/requireAuthLoader';
import {todoLoader} from '../loaders/todoLoader';

import {newTodoAction} from '../actions/newTodoAction';
import {editTodoAction} from '../actions/editTodoAction';

import UnauthorizedLayout from '../components/layouts/UnauthorizedLayout';
import AuthorizedLayout from '../components/layouts/AuthorizedLayout';

import IndexPage from '../pages/IndexPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ErrorPage from '../pages/ErrorPage';
import AddTodoPage from '../pages/AddTodoPage';
import EditTodoPage from '../pages/EditTodoPage';

export const router = createBrowserRouter([
  {
    element: <UnauthorizedLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
    ],
  },
  {
    element: <AuthorizedLayout />,
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
  {
    path: '*',
    element: <Navigate to="/error" replace />,
  },
]);
