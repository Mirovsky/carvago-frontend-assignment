import {redirect} from 'react-router';

import * as authApi from '../api/auth';
import {queryClient} from '../utils/queryClient';

export async function registerAction({request}: {request: Request}) {
  const data = await request.formData();

  const username = data.get('username')?.toString();
  const password = data.get('password')?.toString();
  if (username === null || password === null) {
    return {
      status: 422,
      formError: 'Missing data',
    };
  }

  try {
    await authApi.register(username!, password!);

    await queryClient.invalidateQueries({queryKey: ['me']});
  } catch (e) {
    console.log(e);

    return {
      status: 401,
      formError: 'Invalid credentials',
    };
  }

  throw redirect('/');
}
