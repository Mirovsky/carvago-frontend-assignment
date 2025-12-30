import { useNewTodoMutation } from '../queries/todos'

export default function AddTodoPage() {
    const newTodoMutation = useNewTodoMutation();
    
    const onSubmit = (e : React.FormEvent) => {
        e.preventDefault();

        newTodoMutation.mutate({
            title: (e.target as any).title.value,
            description: (e.target as any).description.value,
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Title <input type="text" id="title" required /></label>
            <label>Description <input type="text" id="description" /></label>

            <button type='submit'>Create Todo</button>
        </form>
    )
}