import React, { useState, useContext, createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import endPoints from "@services/api/";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };
    const { data: access_token } = await axios.post(
      endPoints.auth.login,
      {
        email,
        password,
      },
      options
    );
    if (access_token) {
      const token = access_token.access_token;
      Cookies.set("token", access_token.access_token, {
        expires: 5,
      });
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      setUser(user);
    }
  };
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete axios.defaults.headers.Authorization;
    router.push("/");
  };
  return {
    user,
    signIn,
    error,
    setError,
    logout,
  };
}
