import { useQuery } from "@tanstack/react-query";

export const fetchAuthUser = async () => {
  try {
    const res = await fetch("http://localhost:8000/auth/me", {
      credentials: "include",
    });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch {
    return null;
  }
};


const useAuthUser = () => {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    retry: false,
    refetchOnMount: true,       // jangan refetch lagi saat remount
    refetchOnReconnect: false,   // jangan refetch saat reconnect
    staleTime: 0,         // anggap data “selalu fresh”
  });

  return { authUser, isLoading };
};

export default useAuthUser;

