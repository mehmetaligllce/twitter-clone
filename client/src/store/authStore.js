import { create } from "zustand";
import axios from 'axios';


export const useAuthStore = create((set, get) => ({

    user: null,
    isAuthenticated: false,
    isCheckingAuth: true, 

    checkAuth: async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/auth/me', { withCredentials: true });
            if (response.data.user) {
                set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        }
        catch (err) {
            set({ user: null, isAuthenticated: false, isCheckingAuth: false }); 
        }
    },

    logout: async () => {
        try {
            await axios.post('http://localhost:3000/api/auth/logout', {}, { withCredentials: true });
            set({ user: null, isAuthenticated: false });
        }
        catch (err) {
            console.log("Çıkış yapılamadı: ", err);
        }
    }

}));