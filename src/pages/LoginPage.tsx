import React from 'react'
import { Navigate, useLocation } from 'react-router'

import { useLoginMutation } from '../queries/login'
import { useMeQuery } from '../queries/me'
import { login } from '../api/auth'

export default function LoginPage() {
    const loginMutation = useLoginMutation()
    const { data: me, isLoading } = useMeQuery()
    const location = useLocation()
    
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const params = new URLSearchParams(location.search)
    const returnTo = params.get('returnTo') || '/'

    if (isLoading || me !== null) {
        return <Navigate to={returnTo} replace />
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        loginMutation.mutate({ username, password })
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Login</h1>
            <label>
                Username

                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loginMutation.isPending}
                    required
                />
            </label>
            <label>
                Password

                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loginMutation.isPending}
                    required
                />
            </label>
            <button type="submit" disabled={loginMutation.isPending}>
                {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
            </button>

            {loginMutation.isError && (
                <div style={{ color: 'red' }}>
                    {(loginMutation.error as Error).message}
                </div>
            )}
        </form>
    )
}