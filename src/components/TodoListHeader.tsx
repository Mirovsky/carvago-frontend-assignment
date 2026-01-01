import {NavLink} from 'react-router';

import IconAdd from '@assets/icons/icon-add.svg?react';

import {useDate} from '../utils/time';

export default function TodoListHeader() {
  const date = useDate();

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-2xl">Hello Anette!</h1>
        <span className="text-base text-tertiary">
          {date.toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})}
        </span>
      </div>

      <NavLink className="simple-button button-blue" to="/todo/new">
        Add Todo <IconAdd />
      </NavLink>
    </div>
  );
}
