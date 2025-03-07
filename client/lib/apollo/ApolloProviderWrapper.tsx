"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo-client";
import Cookies from "js-cookie";

// Create Authentication Context
const AuthContext = createContext({
  token: "",
  setToken: (token: string) => {},
});

// ApolloProvider Wrapper with AuthContext
export const ApolloProviderWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    // Load token from cookies
    const storedToken = Cookies.get("Authorization");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Function to update token and store in cookies
  const updateToken = (newToken: string) => {
    const bearerToken = `Bearer ${newToken}`;
    setToken(bearerToken);
    Cookies.set("Authorization", bearerToken, { expires: 7 });
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => useContext(AuthContext);
