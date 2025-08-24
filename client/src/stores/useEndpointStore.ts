import { URL } from "@/config/constants";
import api from "@/lib/axios";
import type { CreateEndpointData, EndpointStore } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";

export const useEndpointStore = create<EndpointStore>((set) => ({
  data: [],
  isLoading: false,
  error: null,
  createEndpoint: async (item: CreateEndpointData) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`${URL}/api/endpoint/create-api`, item, {
        withCredentials: true,
      });
      set((prev) => ({
        ...prev,
        data: [...prev.data, response.data.endpoint],
        isLoading: false,
        error: null,
      }));
      toast.success("Endpoint created successfully 🚀");
    } catch (error) {
      console.log(`Error of createEndpoint: ${error}`);
      set({
        data: [],
        isLoading: false,
        error: "Error occurred in createEndpoint",
      });
      toast.error("Something went wrong.");
    }
  },
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
