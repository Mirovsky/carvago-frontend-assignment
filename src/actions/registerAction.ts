import {redirect} from 'react-router';

import * as authApi from '../api/auth';
import {queryClient} from '../utils/queryClient';

export async function registerAction({request}: {request: Request}) {
  const data = await request.formData();

  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();
  if (username === null || password === null) {
    throw new Error('Failed to register an user');
  }

  await authApi.register(username!, password!);

  await queryClient.invalidateQueries({queryKey: ['me']});

  throw redirect('/');
}
