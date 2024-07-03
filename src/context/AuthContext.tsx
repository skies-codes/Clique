import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import { IContextType, IUser } from "../types/index";
import { getCurrentUser } from "../lib/appwrite/api";
import { INITIAL_STATE, INITIAL_USER } from "../constants/constants";

export const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const checkAuthUser = async () => {
        try {
            const currentUser = localStorage.getItem("currentUser");
            if (currentUser) {
                const currentAccount = JSON.parse(currentUser);
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                });
                setIsAuthenticated(true);

                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuthUser();
    }, [navigate]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                setIsLoading,
                isAuthenticated,
                setIsAuthenticated,
                checkAuthUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
