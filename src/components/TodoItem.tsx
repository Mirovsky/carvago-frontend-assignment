import {NavLink} from 'react-router';

import {Todo} from '../queries/todos';

export default function TodoItem({
  todo,
  isPending,
  completeHandler,
  removeHandler,
}: {
  todo: Todo;
  isPending: boolean;
  completeHandler: (id: string, isOn: boolean) => void;
  removeHandler: (id: string) => void;
}) {
  return (
    <div style={{marginBottom: '10px'}}>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>

      <p>
        <label>
          <input
            type="checkbox"
            defaultChecked={todo.completed}
            onChange={() => completeHandler(todo.id, !todo.completed)}
          />{' '}
          Completed
        </label>
      </p>

      <NavLink to={`/todo/${todo.id}`}>Edit</NavLink>
      <button onClick={() => removeHandler(todo.id)} disabled={isPending}>
        Remove
      </button>
    </div>
  );
}
