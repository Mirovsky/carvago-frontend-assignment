import { queryClient } from "../utils/queryClient";
import { authorizedFetch } from "../api/apiFetch";
import { API_URL } from "../api/auth";

export async function editTodoAction({ request }: { request: Request }) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop() as string

    const data = await request.formData();

    const res = await authorizedFetch(`${API_URL}/todo/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: data.get('title'),
            description: data.get('description'),
            completed: data.get('completed') === 'on'
        })
    })

    if (!res.ok) {
        throw new Error('Failed to edit todo')
    }

    await queryClient.invalidateQueries({ queryKey: ['todos'] })
}