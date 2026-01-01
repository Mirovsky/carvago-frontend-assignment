import {useParams} from 'react-router';

import TodoForm from '../components/TodoForm';
import {useTodosQuery, Todo} from '../queries/todos';

export default function EditTodoPage() {
  const {id} = useParams<{id: string}>();

  const {data: todos} = useTodosQuery();
  const todo = todos?.todos.find((t) => t.id === id);

  return (
    <TodoForm action="Edit Todo" todo={todo}>
      <input type="checkbox" id="completed" name="completed" defaultChecked={todo?.completed} />{' '}
      Completed
    </TodoForm>
  );
}
