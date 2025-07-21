import { useMutation } from "@tanstack/react-query";
import { fetchAnovaResult } from "../fetch";

export const useAnova = (setUploads) => {
  const {
    mutate: runAnovaMutation,
    isPending: isAnovaLoading,
  } = useMutation({
    mutationFn: fetchAnovaResult,
    onSuccess: (data, variables) => {
      setUploads(prev =>
        prev.map(u =>
          u.id === variables.uploadId ? { ...u, ...data } : u
        )
      );
    },
    onError: err => {
      console.error('ANOVA API error:', err);
    },
  });

  return {
    runAnovaMutation,
    isAnovaLoading,
  };
};








