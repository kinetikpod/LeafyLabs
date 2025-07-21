import { useMutation } from "@tanstack/react-query";
import { fetchTtestResult } from "../fetch"

export const useTtest = (setUploads) => {
  const {
    mutate: runTtestMutation,
    isPending: isTtestLoading,
  } = useMutation({
    mutationFn: fetchTtestResult,
    onSuccess: (data, variables) => {
      setUploads(prev =>
        prev.map(u =>
          u.id === variables.uploadId ? { ...u, ...data } : u
        )
      );
    },
    onError: err => {
      console.error('Ttest API error:', err);
    },
  });

  return {
    runTtestMutation,
    isTtestLoading,
  };
};









