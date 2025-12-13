import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { atom, useAtom } from "jotai";

// Global auth state
const authAtom = atom<{
  user: { id: number; openId: string; name: string | null; email: string | null } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}>({
  user: null,
  loading: true,
  error: null,
  isAuthenticated: false,
});

export function useAuth(redirectOnUnauthenticated = false, redirectPath = "/oauth") {
  const [state, setState] = useAtom(authAtom);
  const [, setLocation] = useLocation();

  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      setState({ user: null, loading: false, error: null, isAuthenticated: false });
      window.location.href = "/oauth";
    },
  });

  // Sync server state to global atom
  useEffect(() => {
    if (meQuery.isFetched) {
      if (meQuery.data) {
        setState({
          user: meQuery.data,
          loading: false,
          error: null,
          isAuthenticated: true,
        });
      } else if (meQuery.error) {
        setState({
          user: null,
          loading: false,
          error: meQuery.error.message,
          isAuthenticated: false,
        });
      } else {
        setState((prev) => ({ ...prev, loading: false, isAuthenticated: false }));
      }
    }
  }, [meQuery.data, meQuery.error, meQuery.isFetched, setState]);

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (meQuery.isLoading || logoutMutation.isPending) return;
    if (state.user) return;
    if (typeof window === "undefined") return;
    if (window.location.pathname === redirectPath) return;

    window.location.href = redirectPath
  }, [
    redirectOnUnauthenticated,
    redirectPath,
    logoutMutation.isPending,
    meQuery.isLoading,
    state.user,
  ]);

  return {
    ...state,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
