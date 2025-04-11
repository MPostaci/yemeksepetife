import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

interface User {
    // Define the user properties as needed.
    // For example:
    id: number;
    name: string;
    email: string;
    // role: string;
    // restaurantId: number;
    // You can replace `any` with the actual types.
    [key: string]: any;
}

interface SignupParams {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface UserStore {
    user: User | null;
    users: User[] | null;
    loading: boolean;
    checkingAuth: boolean;
    signup: (params: SignupParams) => Promise<string>;
    login: (email: string, password: string) => Promise<string>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<string>;
    checkAuth: () => Promise<void>;
    getUsersOfCertainRole: (claimName: string) => Promise<User[] | void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    users: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword }) => {
        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axios.post("/auth/register", { name, email, password });
            set({ user: res.data, loading: false });
            return res.data;
        } catch (error: any) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "An error occurred");
            return "";
        }
    },

    login: async (email: string, password: string) => {
        set({ loading: true });

        try {
            const res = await axios.post("/auth/login", { email, password });
            set({ user: res.data, loading: false });
            await get().checkAuth();
            console.log(res.data);
            return res.data;
        } catch (error: any) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "An error occurred");
            return "";
        }
    },

    logout: async () => {
        try{
            await axios.post("/auth/logout");
            set({ user: null});
        } catch (error) {
            console.log(error);
            set({ checkingAuth: false, user: null});
        }
    },

    checkAuth: async () => {
        try {
            const response = await axios.get("/auth/checkAuth");
            set({ user: response.data, checkingAuth: false });
        } catch (error: any) {
            // If checkAuth fails (token expired, etc.), you may want to attempt a token refresh
            try {
                await get().refreshToken();
            } catch {
                set({ user: null });
            }
            set({ checkingAuth: false });
        }
    },

    refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
            await get().checkAuth();
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},

    getUsersOfCertainRole: async (claimName: string) => {
        try {
            const res = await axios.get(`/auth/getusersofcertainrole?claimname=${claimName}`)
            set({ users: res.data });
            return res.data;
        } catch (error) {
            
        }
    }
}));



// Axios interceptor for token refresh
let refreshPromise: Promise<string> | null = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = useUserStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				useUserStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);
