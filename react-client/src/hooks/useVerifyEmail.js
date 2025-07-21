import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchVerifyEmail } from "../fetch";
import { useMutation } from "@tanstack/react-query";

export function useVerifyEmail() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: verifyEmail,
    isPending: isSubmitting,
    isError,
    error,
  } = useMutation({
    mutationFn: fetchVerifyEmail,
    onSuccess: (userOut) => {
      queryClient.setQueryData(['authUser'], userOut);
      toast.success('Email berhasil diverifikasi!');
    },
    onError: (err) => {
      const message = err?.message || 'Something went wrong';
      toast.error(message);
    },
  });

  return { verifyEmail, isSubmitting, isError, error };
}
