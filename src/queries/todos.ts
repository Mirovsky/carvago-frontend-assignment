import { useQuery } from '@tanstack/react-query'

import { authorizedFetch } from '../api/apiFetch'
import { API_URL } from '../api/auth'

export type Todos = {
    todos: Todo[]
}

export type Todo = {
    id: string
    title: string
    userId: string
    completed: boolean
    createdAt: string
    description: string | null
}

export async function fetchTodos() {
    const res = await authorizedFetch(`${API_URL}/todo/list`, {
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch todos')
    }
    return (await res.json()) as Todos
}

export function useTodosQuery() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    })
}
