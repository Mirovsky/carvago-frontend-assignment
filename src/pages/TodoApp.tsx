import { Route, Routes } from 'react-router'

import { AppProviders } from '../utils/AppProviders'
import ProtectedRoute from '../utils/ProtectedRoute'

import Login from './Login'
import Register from './Register'
import Error from './Error'

export default function TodoApp() {
  return (
    <AppProviders>
      <Routes>
        <Route index element={<ProtectedRoute><div>Todo App</div></ProtectedRoute>} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='error' element={<Error />} />
      </Routes>
    </AppProviders>
  )
}