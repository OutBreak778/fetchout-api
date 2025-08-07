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
      login: async (email: string, password: string) => {
        if (!email || !password) {
          toast.error("All fields are required.");
          return;
        }
        try {
          set({ isLoading: true });

          const URL = import.meta.env.VITE_SERVER_URL!;
          const response = await api.post(`${URL}/auth/login`, {
            email,
            password,
          });
          console.log(response);

          set({ isLoading: false, isAuthenticated: true, user: response.data });
        } catch (error) {
          console.log(`Error in useAuthStore in Login: ${error}`);
          toast.error("Something went wrong! Please try again.");
          set({ isAuthenticated: false, user: null });
        } finally {
          set({ isLoading: false });
        }
      },
      logout: async () => {
        try {
          set({ isLoading: true });

          const URL = import.meta.env.VITE_SERVER_URL!;
          const response = await api.post(`${URL}/auth/logout`, {});
          console.log(response);

          toast.success("Logout Successful.");
          set({ isLoading: false, isAuthenticated: false, user: null });
        } catch (error) {
          console.log(`Error in useAuthStore in Logout: ${error}`);
          toast.error("Something went wrong! Please try again.");
          set({ isAuthenticated: false, user: null });
        }
      },
      fetchUser: async () => {
        try {
          set({ isLoading: true });
          const URL = import.meta.env.VITE_SERVER_URL!;
          const res = await api.get(`${URL}/auth/user`, {
            withCredentials: true,
          });

          set((prev) => ({
            ...prev,
            isAuthenticate: true,
            user: res.data,
            isLoading: false,
          }));
        } catch (error) {
          console.log("Not authenticated:", error);
          set({ user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: "auth-storage" }
  )
);
