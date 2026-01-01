import {useMemo, useState} from 'react';

import {useTodosQuery, useRemoveTodoMutation, useCompleteTodoMutation} from '../queries/todos';
import TodoItem from './TodoItem';
import {set} from 'ramda';

export default function TodoList() {
  const {data: todos, isLoading, isError, error} = useTodosQuery();

  const completeTodoMutation = useCompleteTodoMutation();

  const removeTodoMutation = useRemoveTodoMutation();
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set<string>());

  const completed = useMemo(() => todos?.todos.filter((t) => t.completed) ?? [], [todos]);
  const pending = useMemo(() => todos?.todos.filter((t) => !t.completed) ?? [], [todos]);

  const onComplete = (id: string, completed: boolean) => {
    completeTodoMutation.mutate({id, completed});
  };

  const onRemove = (id: string) => {
    setPendingIds(new Set(pendingIds).add(id));

    removeTodoMutation.remove(id, {
      onSettled: () => {
        setPendingIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      },
    });
  };

  if (isLoading) {
    return <div>Loading todos..</div>;
  }

  if (isError) {
    return <div>Error loading todos: {(error as Error).message}</div>;
  }

  if (todos?.todos.length === 0) {
    return <div>No todos found. Add your first todo!</div>;
  }

  return (
    <div>
      <h2>Pending Todos</h2>
      <div>
        {pending.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isPending={pendingIds.has(todo.id)}
            completeHandler={onComplete}
            removeHandler={onRemove}
          />
        ))}
      </div>

      <hr />

      <h2>Completed Todos</h2>
      <div>
        {completed.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isPending={pendingIds.has(todo.id)}
            completeHandler={onComplete}
            removeHandler={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
