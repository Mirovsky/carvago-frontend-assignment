import {NavLink} from 'react-router';

import IconCheck from '@assets/icons/icon-check.svg?react';
import IconDelete from '@assets/icons/icon-delete.svg?react';
import IconEdit from '@assets/icons/icon-edit.svg?react';

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
      <div className="relative w-full flex flex-row justify-between">
        <label className="group h-10 flex cursor-pointer">
          <input
            type="checkbox"
            name=""
            id=""
            className="peer sr-only"
            defaultChecked={todo.completed}
            onChange={() => completeHandler(todo.id, !todo.completed)}
          />

          <span className="absolute top-1 left- w-8 h-8 bg-white border-2 border-gray rounded-full group-hover:border-brand group-hover:ring-4 group-hover:ring-brand/20 peer-checked:border-brand peer-checked:bg-brand"></span>
          <span className="absolute top-3 left-2 w-4 h-4 text-white hidden pointer-events-none peer-checked:block">
            <IconCheck />
          </span>

          <h3 className="pl-12 font-medium text-lg/10">{todo.title}</h3>
        </label>

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
