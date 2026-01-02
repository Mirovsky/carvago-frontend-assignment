import {useParams} from 'react-router';

import Checkbox from '../components/simple/Checkbox';
import TodoForm from '../components/TodoForm';
import {useTodosQuery} from '../queries/todos';

export default function EditTodoPage() {
  const {id} = useParams<{id: string}>();

  const {data: todos} = useTodosQuery();
  const todo = todos?.todos.find((t) => t.id === id);

  return (
    <TodoForm title={todo?.title ?? ''} action="Save changes" discard="Discard changes" todo={todo}>
      <Checkbox id="completed" defaultChecked={todo?.completed}>
        Completed
      </Checkbox>
    </TodoForm>
  );
}
