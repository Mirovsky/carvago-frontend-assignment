import {useMutation, useQueryClient} from '@tanstack/react-query';
import * as authApi from '../api/auth';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({username, password}: {username: string; password: string}) =>
      await authApi.login(username, password),
    onSuccess: async () => await queryClient.invalidateQueries({queryKey: ['me']}),
  });
}
