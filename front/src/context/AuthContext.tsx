import { createContext, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    token: string | null;
    userId: string | null;
    isLogged: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    userId: null,
    isLogged: false,
    login: () => { },
    logout: () => { },
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("auth_token");
    });

    const [userId, setUserId] = useState<string | null>(() => {
        const savedToken = localStorage.getItem("auth_token");
        if (savedToken) {
            try {
                const decoded = jwtDecode<{ id: string }>(savedToken);
                return decoded.id;
            } catch {
                return null;
            }
        }
        return null;
    });

    const login = (newToken: string) => {
        localStorage.setItem("auth_token", newToken);
        setToken(newToken);

        try {
            const decoded = jwtDecode<{ id: string }>(newToken);
            console.log(decoded.id)
            setUserId(decoded.id);
        } catch {
            setUserId(null);
        }
    };

    const logout = () => {
        localStorage.removeItem("auth_token");
        setToken(null);
        setUserId(null);
    };

    const isLogged = !!token;

    const contextValue = useMemo(
        () => ({ token, userId, isLogged, login, logout }),
        [token, userId, isLogged]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
