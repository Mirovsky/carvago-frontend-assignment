import { tokenStore } from './tokenStore'

// TODO: Pass in via env variable
export const API_URL = 'http://localhost:3001/api'

export async function register(username: string, password: string) {
    const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({username, password}),
    })

    if (!res.ok) {
        throw new Error('Registration failed')
    }

    const data = (await res.json()) as { accessToken: string; refreshToken: string }

    tokenStore.set({ access: data.accessToken, refresh: data.refreshToken })
}

export async function login(username: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({username, password}),
    })

    if (!res.ok) {
        throw new Error('Login failed')
    }

    const data = (await res.json()) as { accessToken: string; refreshToken: string }
    tokenStore.set({ access: data.accessToken, refresh: data.refreshToken })
}

export async function refresh(): Promise<boolean> {
    const t = tokenStore.get()
    if (t.refresh === null) {
        return false;
    }

    const res = await fetch(`${API_URL}/refresh-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ refreshToken: t.refresh }),
    })

    if (!res.ok) {
        return false
    }

    const data = (await res.json()) as { accessToken: string }

    tokenStore.set({ ...t, access: data.accessToken })
    return true
}
