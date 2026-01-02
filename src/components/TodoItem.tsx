import {NavLink} from 'react-router';

import IconCheck from '@assets/icons/icon-check.svg?react';
import IconDelete from '@assets/icons/icon-delete.svg?react';
import IconEdit from '@assets/icons/icon-edit.svg?react';

import Checkbox from '../components/simple/Checkbox';
import {Todo} from '../queries/todos';
import {Menu} from './simple/Menu';

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
    <div className="flex flex-col gap-1">
      <div className="w-full flex flex-row justify-between">
        <Checkbox
          id="completed"
          defaultChecked={todo.completed}
          onChange={() => completeHandler(todo.id, !todo.completed)}
        >
          <h3 className="font-medium text-lg/10">{todo.title}</h3>
        </Checkbox>

        <div className="w-10 h-10">
          <Menu>
            <NavLink role="menuitem" className="menu-button" to={`/todo/${todo.id}`}>
              <IconEdit /> Edit
            </NavLink>

            <button
              className="menu-button text-danger"
              onClick={() => removeHandler(todo.id)}
              disabled={isPending}
              role="menuitem"
            >
              <IconDelete /> Delete
            </button>
          </Menu>
        </div>
      </div>
      <p className="pl-12 text-base text-tertiary">{todo.description}</p>
    </div>
  );
}
