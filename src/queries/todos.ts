import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {authorizedFetch} from '../api/apiFetch';
import {API_URL} from '../api/auth';

export type Todos = {
  todos: Todo[];
};

export type Todo = {
  id: string;
  title: string;
  userId: string;
  completed: boolean;
  createdAt: string;
  description: string | null;
};

export async function fetchTodos() {
  const res = await authorizedFetch(`${API_URL}/todo/list`);

  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  return (await res.json()) as Todos;
}

export function useTodosQuery() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });
}

export function useCompleteTodoMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({id, completed}: {id: string; completed: boolean}) => {
      const res = await authorizedFetch(`${API_URL}/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: completed,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to edit todo');
      }

      return {id, completed};
    },
    onSuccess: async ({id, completed}) => {
      queryClient.setQueryData<Todos | undefined>(['todos'], (old) => {
        if (old) {
          const index = old.todos.findIndex((t) => t.id === id);
        }

        return old;
      });
    },
  });
}

export function useRemoveTodoMutation() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({id}: {id: string}) => {
      const res = await authorizedFetch(`${API_URL}/todo/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete todo');
      }

      return {id};
    },
    onSuccess: async ({id}) => {
      queryClient.setQueryData<Todos | undefined>(['todos'], (old) =>
        old ? {todos: old.todos.filter((t) => t.id !== id)} : old
      );

      await queryClient.invalidateQueries({queryKey: ['todos']});
    },
  });

  return {
    remove: (id: string, opts?: Parameters<typeof mutation.mutate>[1]) =>
      mutation.mutate({id}, opts),
    ...mutation,
  };
}
