import {NavLink} from 'react-router';

export default function TodoListHeader() {
  return (
    <div>
      <h2>Hello Anette!</h2>
      <NavLink to="/todo/new">Add Todo</NavLink>
    </div>
  );
}
