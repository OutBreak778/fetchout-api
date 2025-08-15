import api from "@/lib/axios";
import type { EndpointStore } from "@/types";
import { create } from "zustand";

export const useEndpointStore = create<EndpointStore>((set) => ({
  data: [],
  isLoading: true,
  error: null,
  fetchEndpoint: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_URL}/api/endpoint/fetch-api`,
        { withCredentials: true }
      );
      set((prev) => ({
        ...prev,
        data: response.data.endpoint,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      console.log(`Error in EndpointStore: ${error}`);
      set({
        data: [],
        isLoading: false,
        error: "Error occurred in useEndpointStore",
      });
    }
  },
}));
