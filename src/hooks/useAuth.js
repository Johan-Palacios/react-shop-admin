import React, { useState, useContext, createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import endPoints from "@services/api/";

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };
    const { data: access_tocken } = await axios.post(
      endPoints.auth.login,
      {
        email,
        password,
      },
      options
    );
    if (access_tocken) {
      Cookies.set("token", access_tocken.access_token, {
        expires: 5,
      });
    }
  };
  return {
    user,
    signIn,
    error,
    setError,
  };
}
