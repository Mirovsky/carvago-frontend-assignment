import { useMemo } from 'react'
import { NavLink } from 'react-router'

import { useTodosQuery } from '../queries/todos'

export default function TodoList() {
    const { data: todos, isLoading, isError, error } = useTodosQuery()

    const completed = useMemo(
        () => todos?.todos.filter(t => t.completed) ?? [],
        [todos]
    )
    const pending = useMemo(
        () => todos?.todos.filter(t => !t.completed) ?? [],
        [todos]
    )

    if (isLoading) {
        return <div>Loading todos..</div>
    }

    if (isError) {
        return <div>Error loading todos: {(error as Error).message}</div>
    }

    if (todos?.todos.length === 0) {
        return <div>No todos found. Add your first todo!</div>
    }

    return (
        <div>
            <h2>Pending Todos</h2>
            <ul>
                {pending.map(todo => <li key={todo.id}>{todo.title} <NavLink to={`/todo/${todo.id}`}>Edit</NavLink></li>)}
            </ul>
            
            <hr />

            <h2>Completed Todos</h2>
            <ul>
                {completed.map(todo => <li key={todo.id}>{todo.title} (completed)</li>)}
            </ul>
        </div>
    )
}