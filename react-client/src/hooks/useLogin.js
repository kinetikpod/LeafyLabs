import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLogin } from '../fetch';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: login,
    isPending: isSubmitting,
    isError,
  } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      // Invalidate and refetch authenticated user data
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success('Logged in successfully!');
    },
    onError: (err) => {
      const message = err?.message || 'Something went wrong';
      toast.error(message);
    },
  });

  return { login, isSubmitting, isError };
}

