"use client";

import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo-client";

// Create Authentication Context
const AuthContext = createContext<{ token: string; setToken: (token: string) => void }>({
    token: "",
    setToken: () => { },
});

// ApolloProvider Wrapper with AuthContext
export const ApolloProviderWrapper = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        // Load token from localStorage
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
        </AuthContext.Provider>
    );
};

// Custom Hook to Use AuthContext
export const useAuth = () => useContext(AuthContext);
