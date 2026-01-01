import {Todo} from '../queries/todos';
import TodoItem from './TodoItem';
import TodoEmpty from './TodoEmpty';

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
  return (
    <section>
      <h2>{listName}</h2>

      {todos.length === 0 && <TodoEmpty />}

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
    </section>
  );
}
