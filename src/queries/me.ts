import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '../api/apiFetch'
import { API_URL } from '../api/auth'

export type Me = { id: string, username: string, createdAt: string }

async function fetchMe() {
    const res = await apiFetch(`${API_URL}/user/me`)
    if (res.status === 401) {
        return null
    }
    if (!res.ok) {
        throw new Error('Failed to fetch user data')
    }

    return (await res.json()) as Me
}

export function useMeQuery() {
    return useQuery({
        queryKey: ['me'],
        queryFn: fetchMe,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: (failureCount, error) => failureCount < 1
    })
}