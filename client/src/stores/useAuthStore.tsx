import api from "@/lib/axios";
import type { AuthStore } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create<AuthStore>((set) => ({
  user: [],
  isAuthenticated: false,
  isLoading: true,
  login: async (email: string, password: string) => {
    if(!email || !password) {
      toast.error("All fields are required.")
      return
    }
    try {
      set({ isLoading: true });

      const URL = import.meta.env.VITE_SERVER_URL!;
      const response = await api.post(`${URL}/auth/login`, {email, password});
      console.log(response);

      set({ isLoading: false, isAuthenticated: true, user: response.data });

    } catch (error) {
      console.log(`Error in useAuthStore in Login: ${error}`);
      toast.error("Something went wrong! Please try again.")
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
      
      toast.success("Logout Successful.")
      set({ isLoading: false, isAuthenticated: false, user: null });
    } catch (error) {
      console.log(`Error in useAuthStore in Logout: ${error}`);
      toast.error("Something went wrong! Please try again.")
      set({ isAuthenticated: false, user: null });
    }
  },
  fetchUser: async () => {
    set({});
  },
}));
