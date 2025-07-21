import { fetchPrediction } from "../fetch";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePredict() {

  const {
    mutateAsync: predict,
    isPending: isSubmitting,
    isError,
  } = useMutation({
    mutationFn: fetchPrediction,
    onSuccess: () => {
      toast.success('Prediction successful!');

    },
    onError: (err) => {
      const message = err?.message || 'Something went wrong';
      toast.error(message);
    },
  });

  return { predict, isSubmitting, isError };
}
