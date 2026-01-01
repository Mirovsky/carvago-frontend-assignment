import {useMemo, useState} from 'react';

import {useTodosQuery, useRemoveTodoMutation, useCompleteTodoMutation} from '../queries/todos';
import TodoList from './TodoList';
import EmptyList from './EmptyList';

export default function TodosList() {
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
    return <EmptyList />;
  }

  return (
    <div className="flex flex-col gap-10">
      <TodoList
        listName="To-do"
        todos={pending}
        pending={pendingIds}
        completeHandler={onComplete}
        removeHandler={onRemove}
      />

      {completed.length > 0 && (
        <TodoList
          listName="Completed"
          todos={completed}
          pending={pendingIds}
          completeHandler={onComplete}
          removeHandler={onRemove}
        />
      )}
    </div>
  );
}
