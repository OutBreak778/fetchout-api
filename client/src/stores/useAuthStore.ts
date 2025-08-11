import { URL } from "@/config/constants";
import api from "@/lib/axios";
import type { AuthStore } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await api.post(
            `${URL}/auth/login`,
            { email, password },
            { withCredentials: true }
          );

          const response = await api.get(`${URL}/auth/user`, {
            withCredentials: true,
          });
          // console.log(response.data.user)
          set({
            user: response.data.data,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          const message = error.response?.data?.message || "Login failed";
          set({
            error: message,
            isLoading: false,
            isAuthenticated: false,
          });
          toast.error(message);
        }
      },
      logout: async () => {
        try {
          set({ isLoading: true });
          const res = await api.post(
            `${URL}/auth/logout`,
            {},
            { withCredentials: true }
          );
          if (res.status === 200) {
            set({
              isAuthenticated: false,
              user: null,
              error: null,
            });
          }
          toast.success("Logged out Successfully");
        } catch (error) {
          set({
            error: `Logout Failed in useAuthStore: ${error}`,
          });
        } finally {
          set({
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
          toast.success("Logged out Successfully");
        }
      },
      fetchUser: async () => {
        set({ isLoading: true });
        try {
          const response = await api.get(`${URL}/auth/user`, {
            withCredentials: true,
          });

          set((item) => ({
            ...item,
            user: response.data.data,
            isAuthenticated: true,
            isLoading: false,
          }));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.response?.status === 401) {
            // Not logged in — clear auth state without error spam
            set({ user: null, isAuthenticated: false, isLoading: false });
            return;
          }
          set({
            error: `Fetch User Failed in useAuthStore: ${error}`,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.isAuthenticated) {
          // Background check to ensure cookie is still valid
          state.fetchUser?.();
        }
      },
    }
  )
);
