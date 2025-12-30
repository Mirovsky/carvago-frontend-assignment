import { createBrowserRouter, Navigate } from "react-router"

import { requireAuthLoader } from "./requireAuthLoader"
import UnauthorizedLayout from "../components/layouts/UnauthorizedLayout"
import AuthorizedLayout from "../components/layouts/AuthorizedLayout"
import IndexPage from "../pages/IndexPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import ErrorPage from "../pages/ErrorPage"
import AddTodoPage from "../pages/AddTodoPage"
import EditTodoPage from "../pages/EditTodoPage"

export const router = createBrowserRouter([
    {
        element: <UnauthorizedLayout />,
        children: [
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            }
        ]
    },
    {
        element: <AuthorizedLayout />,
        loader: requireAuthLoader,
        children: [
            {
                path: '/',
                element: <IndexPage />
            },
            {
                path: '/todo/new',
                element: <AddTodoPage />
            },
            {
                path: '/todo/:id',
                element: <EditTodoPage />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/error" replace />
    }
])