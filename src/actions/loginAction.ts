import {redirect} from 'react-router';

import * as authApi from '../api/auth';
import {queryClient} from '../utils/queryClient';

export async function loginAction({request}: {request: Request}) {
  const data = await request.formData();

  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();
  if (username === null || password === null) {
    throw new Error('Failed to login an user');
  }

  await authApi.login(username!, password!);

  await queryClient.invalidateQueries({queryKey: ['me']});

  throw redirect('/');
}
