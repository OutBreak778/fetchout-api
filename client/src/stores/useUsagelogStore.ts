import { URL } from "@/config/constants";
import api from "@/lib/axios";
import type { UsagelogStore } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";

export const useUsagelogStore = create<UsagelogStore>((set) => ({
  usage: [],
  isLoading: true,
  error: null,
  fetchLogs: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get(`${URL}/api/usage-log`, {
        withCredentials: true,
      });
      set({ isLoading: false, error: null, usage: response.data.usage || []});
    } catch (error) {
      console.log(`error in usageLogStore: ${error}`);
      set({
        usage: [],
        isLoading: false,
        error: "Something went wrong while fetching logs.",
      });
      toast.error("Logs fetching failed.");
    }
  },
}));
