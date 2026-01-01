import {Todo} from '../queries/todos';
import TodoItem from './TodoItem';
import TodoEmpty from './TodoEmpty';
import EmptyList from './EmptyList';

type TodoListProps = {
  listName: string;
  todos: Todo[];
  pending: Set<string>;
  completeHandler: (id: string, completed: boolean) => void;
  removeHandler: (id: string) => void;
};

export default function TodoList({
  listName,
  todos,
  pending,
  completeHandler,
  removeHandler,
}: TodoListProps) {
  if (todos.length == 0) {
    return <EmptyList />;
  }

  return (
    <section className="flex flex-col w-full">
      <h2 className="py-0.5 mb-3 text-xl text-primary font-semibold">{listName}</h2>

      <hr className="mb-6 border-b border-gray-100" />

      <div className="flex flex-col gap-4">
        {todos.length > 0 &&
          todos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              isPending={pending.has(t.id)}
              completeHandler={completeHandler}
              removeHandler={removeHandler}
            />
          ))}
      </div>
    </section>
  );
}
