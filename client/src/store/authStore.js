import axios from "axios";
import {create} from "zustand";

const BASE_URL = "http://localhost:3000/api/auth";

axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,

    signup: async (username, email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/signup`, {
                username, email, password
            });

            set({user: response.data.user, isAuthenticated: true, error: null});
            return response.data;
        } catch (error) {
            set({error: error.response?.data?.error || "Signup failed"});
            return null;
        }
    },

    login: async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                email, password
            });

            set({user: response.data.user, isAuthenticated: true, error: null});
            return response.data;
        } catch (error) {
            set({error: error.response?.data?.error || "Login failed"});
            return null;
        }
    },

    logout: async () => {
        try {
            await axios.post(`${BASE_URL}/logout`);
            set({user: null, isAuthenticated: false, error: null});
        } catch (error) {
            set({error: error.response?.data?.error || "Loggout failed"})
        }
    },
}));

export default useAuthStore;