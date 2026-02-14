/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

/* ================= Types ================= */

interface User {
    id: string;
    username?: string;
    name?: string;
    email?: string;
    role?: string;
    profilePic?: string;
}

interface AuthState {
    loading: boolean | null;
    getUserLoading: boolean | null;
    logoutLoading: boolean;
    error: string | null;
    user: User | null;
}

interface LoginResponse {
    access_token: string;
}

interface GetUserResponse {
    user?: User;
    data?: User;
}

interface AuthContextValue {
    state: AuthState;
    login: (data: unknown) => Promise<{ error?: string } | void>;
    register: (data: unknown) => Promise<{ error?: string } | void>;
    logout: () => void;
    fetchUser: () => Promise<boolean>;
    isAuthenticated: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

/* ================= Context ================= */

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ================= Provider ================= */

function AuthProvider({ children }: AuthProviderProps) {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();

    const [state, setState] = useState<AuthState>({
        loading: null,
        getUserLoading: null,
        logoutLoading: false,
        error: null,
        user: null,
    });

    if (!API_BASE_URL) {
        console.warn("VITE_API_BASE_URL is not defined. Please check your .env configuration.");
    }

    /* ============ Fetch User ============ */

    const fetchUser = async (): Promise<boolean> => {
        const token = localStorage.getItem("token");

        if (!token) {
            setState((prev) => ({
                ...prev,
                user: null,
                getUserLoading: false,
            }));
            return false;
        }

        try {
            setState((prev) => ({ ...prev, getUserLoading: true }));

            const response = await axios.get<User | GetUserResponse>(
                `${API_BASE_URL}/auth/get-user`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const payload = response.data as User | GetUserResponse;
            const normalizedUser = "id" in payload ? payload : payload.user ?? payload.data ?? null;

            setState((prev) => ({
                ...prev,
                user: normalizedUser,
                getUserLoading: false,
            }));
            return Boolean(normalizedUser);
        } catch (error) {
            const err = error as AxiosError<{ error: string }>;
            console.error("fetchUser error:", err);

            const backendMessage = err.response?.data?.error;
            const message = backendMessage || err.message;

            setState((prev) => ({
                ...prev,
                error: message,
                user: null,
                getUserLoading: false,
            }));
            return false;
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    /* ============ Login ============ */

    const login = async (
        data: unknown
    ): Promise<{ error?: string } | void> => {
        try {
            setState((prev) => ({
                ...prev,
                loading: true,
                error: null,
            }));

            const response = await axios.post<LoginResponse>(
                `${API_BASE_URL}/auth/login`,
                data
            );

            const token = response.data.access_token;
            localStorage.setItem("token", token);

            setState((prev) => ({
                ...prev,
                loading: false,
            }));

            const userFetched = await fetchUser();
            if (userFetched) {
                navigate("/");
                return;
            }

            return {
                error:
                    "Login succeeded but user profile could not be loaded. Please check API base URL and /auth/get-user endpoint.",
            };
        } catch (error) {
            const err = error as AxiosError<{ error: string }>;

            const message =
                err.response?.data?.error || "Login failed";

            console.error("Login error:", err.response?.data);
            setState((prev) => ({
                ...prev,
                loading: false,
                error: message,
            }));

            return { error: message };
        }
    };

    /* ============ Register ============ */

    const register = async (
        data: unknown
    ): Promise<{ error?: string } | void> => {
        try {
            setState((prev) => ({
                ...prev,
                loading: true,
                error: null,
            }));

            await axios.post(`${API_BASE_URL}/auth/register`, data);

            setState((prev) => ({
                ...prev,
                loading: false,
            }));

            navigate("/signup/success");
        } catch (error) {
            const err = error as AxiosError<{ error: string }>;

            const message =
                err.response?.data?.error || "Registration failed";

            setState((prev) => ({
                ...prev,
                loading: false,
                error: message,
            }));

            return { error: message };
        }
    };

    /* ============ Logout ============ */

    const logout = (): void => {
        setState((prev) => ({
            ...prev,
            logoutLoading: true,
        }));

        window.setTimeout(() => {
            localStorage.removeItem("token");

            setState({
                user: null,
                error: null,
                loading: null,
                getUserLoading: null,
                logoutLoading: false,
            });

            window.location.assign("/");
        }, 400);
    };

    const isAuthenticated = Boolean(state.user);

    /* ============ Provider Value ============ */

    const value: AuthContextValue = {
        state,
        login,
        register,
        logout,
        fetchUser,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

/* ================= Hook ================= */

const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};

export { AuthProvider, useAuth };

