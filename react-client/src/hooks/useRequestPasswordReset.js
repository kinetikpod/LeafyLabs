import { useMutation } from '@tanstack/react-query';
import { fetchRequestPasswordReset } from '../fetch';
import toast from 'react-hot-toast';

export function useRequestPasswordReset() {
  const {
    mutateAsync: requestPasswordReset,
    isPending: isSubmitting,
    isError,
    error,
  } = useMutation({
    mutationFn: fetchRequestPasswordReset,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err?.message || 'Something went wrong');
    },
  });

  return { requestPasswordReset, isSubmitting, isError, error };
}

