import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { API_URL, environment } from "../utils/constants";

export interface UserData {
  _id: string;
  username: string;
  email: string;
}

export interface AuthData {
  email: string;
  password: string;
  username?: string; // only used in signup
}

interface AuthContextType {
  user: UserData | null;

  Signin: (data: AuthData) => Promise<{ ok: boolean; message?: string }>;

  Signup: (data: AuthData) => Promise<{ ok: boolean; message?: string }>;

  Logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const Signin = async (data: AuthData) => {
    {
      /* we can even write (email: string, password: string) here and use it in the function below */
    }
    try {
      const res = await axios.post(`${API_URL}/api/signin`, {
        email: data.email,
        password: data.password,
      });

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user from backend response
      setUser(res.data.user);

      return { ok: true };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return { ok: false, message: error.response?.data?.message };
      }
      return { ok: false, message: "Unknown error" };
    }
  };

  const Signup = async (data: AuthData) => {
    try {
      const res = await axios.post(`${API_URL}/api/signup`, {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      return { ok: true, message: res.data.message };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return { ok: false, message: error.response?.data?.message };
      }
      return { ok: false, message: "Unknown error" };
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };


  return (
    <AuthContext.Provider value={{ user, Signin, Signup, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

//eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
