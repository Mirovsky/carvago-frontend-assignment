import {queryClient} from '../utils/queryClient';
import {authorizedFetch} from '../api/apiFetch';
import {API_URL} from '../api/auth';
import {redirect} from 'react-router';

export async function newTodoAction({request}: {request: Request}) {
  const data = await request.formData();

  const res = await authorizedFetch(`${API_URL}/todo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.get('title'),
      description: data.get('description'),
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to create todo');
  }

  await queryClient.invalidateQueries({queryKey: ['todos']});

  throw redirect('/');
}
