import {Form, NavLink} from 'react-router';

import IconBackwards from '@assets/icons/icon-backwards.svg?react';
import IconCheck from '@assets/icons/icon-check.svg?react';

import {Todo} from '../queries/todos';
import Input from '../components/simple/Input';
import TextArea from '../components/simple/TextArea';

type TodoFormProps = {
  title: string;
  action: string;
  discard: string;
  todo?: Todo;
  children?: React.ReactNode;
};

export default function TodoForm({title, action, discard, todo, children}: TodoFormProps) {
  return (
    <section className="container-box">
      <h1 className="flex flex-col justify-start items-start gap-6 sm:flex-row sm:items-center">
        <NavLink to="/" className="w-10 h-10 px-0 simple-button button-gray">
          <IconBackwards />
        </NavLink>
        <span className="font-bold text-2xl text-primary ">{title}</span>
      </h1>
      <Form method="post" className="flex flex-col gap-10">
        <Input id="title" label="Title" type="text" required defaultValue={todo?.title ?? ''} />
        <TextArea id="description" label="Description" defaultValue={todo?.description ?? ''} />

        {children}

        <div className="flex flex-col gap-2 justify-between sm:flex-row-reverse">
          <button type="submit" name="intent" value="submit" className="simple-button button-blue">
            {action} <IconCheck />
          </button>
          <NavLink to="/" className="simple-button button-gray">
            {discard}
          </NavLink>
        </div>
      </Form>
    </section>
  );
}
