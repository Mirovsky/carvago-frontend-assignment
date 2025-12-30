import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation } from 'react-router'

import { apiFetch } from '../api/apiFetch'
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

async function fetchTodos() {
    const res = await apiFetch(`${API_URL}/todo/list`, {
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error('Failed to fetch todos')
    }
    return (await res.json()) as Todos
}

export function useNewTodoMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ title, description }: { title: string, description: string }) => {
            const res = await apiFetch(`${API_URL}/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            })

            if (!res.ok) {
                throw new Error('Failed to create todo')
            }

            return await res.json()
        },
        onSuccess: async () =>
            await queryClient.invalidateQueries({ queryKey: ['todos'] })
    })
}

export function useEditTodoMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, title, description }: { id: string, title: string, description: string }) => {
            const res = await apiFetch(`${API_URL}/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description })
            })

            if (!res.ok) {
                throw new Error('Failed to edit todo')
            }

            return await res.json()
        },
        onSuccess: async () =>
            await queryClient.invalidateQueries({ queryKey: ['todos'] })
    })
}

export function useTodoQuery() {
    const loc = useLocation()
    const id = loc.pathname.split('/').pop() as string

    return useQuery({
        queryKey: ['todo', id],
        queryFn: async () => {
            const res = await apiFetch(`${API_URL}/todo/${id}`, {
                credentials: 'include'
            })

            if (!res.ok) {
                throw new Error('Failed to fetch todo')
            }

            return (await res.json()) as Todo
        }
    })
}

export function useTodosQuery() {
    return useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos
    })
}
