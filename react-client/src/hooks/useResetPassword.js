import { fetchResetPassword } from "../fetch";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
  const {
    mutateAsync: resetPassword,
    isPending: isSubmitting,
    isError,
    error,
  } = useMutation({
    mutationFn: fetchResetPassword,
    onSuccess: () => {
      toast.success('Password berhasil direset! Silakan login dengan password baru.');
    },
    onError: (err) => {
      toast.error(err?.message || 'Terjadi kesalahan');
    },
  });

  return { resetPassword, isSubmitting, isError, error };
}

