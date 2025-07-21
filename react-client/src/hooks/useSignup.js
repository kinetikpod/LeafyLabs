import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { fetchSignup } from '../fetch';

export function useSignup() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: signup,
    isPending: isSubmitting,
    error,
    isError,
  } = useMutation({
    mutationFn: fetchSignup,
    onSuccess: () => {
      // Refresh the authenticated user data
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // queryClient.refetchQueries({ queryKey: ['authUser'] });
      toast.success('Account created successfully');
    },
    onError: (error) => {
      // Display error message
      toast.error(error.message || "Something went wrong");
    },
  });

  return { signup, isSubmitting, error, isError };
}

