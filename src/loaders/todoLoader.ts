import {redirect} from 'react-router';

import {queryClient} from '../utils/queryClient';
import {fetchTodos} from '../queries/todos';

export async function todoLoader({request}: {request: Request}) {
  try {
    const todos = await queryClient.ensureQueryData({
      queryKey: ['todo'],
      queryFn: fetchTodos,
    });
  } catch (err) {
    if (err instanceof Response) {
      throw err;
    }

    throw redirect('/error');
  }
}
