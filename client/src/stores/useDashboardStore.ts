import api from "@/lib/axios"
import type { DashboardStore } from "@/types"
import {create} from "zustand"

export const useDashboardStore = create<DashboardStore>((set) => ({
    data: null,
    isLoading: false,
    error: null,
    fetchDashboard: async () => {
        set({isLoading: true})
        try {
            const response = await api.get(`${import.meta.env.VITE_SERVER_URL}/dashboard`)
            set({isLoading: false, error: null, data: response.data.data})
            
        } catch (error) {
            console.log(`${error} in useDahsboardStore`)
            set({data: null, isLoading: false, error: "Error occurred in useDashboardStore"})
        }
    }
}))