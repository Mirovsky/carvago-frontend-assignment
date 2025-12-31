import { Form } from 'react-router'
import { Todo } from '../queries/todos'

export default function TodoForm({ action, todo, children }: { action: string, todo?: Todo, children?: React.ReactNode }) {
    return (
        <Form method='post'>
            <label>Title <input type="text" id="title" name="title" required defaultValue={todo?.title} /></label>
            <label>Description <input type="text" id="description" name="description" defaultValue={todo?.description ?? ""} /></label>
            
            {children}

            <button type='submit'>{action}</button>
        </Form>
    )
}