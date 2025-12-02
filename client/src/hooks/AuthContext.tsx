import React, { useState, createContext, useContext } from "react";
import axios from "axios";

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

  Signin: (
    data: AuthData
  ) => Promise<{ ok: boolean; message?: string }>;

  Signup: (
    data: AuthData
  ) => Promise<{ ok: boolean; message?: string }>;

  Logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const Signin = async (data: AuthData) => { {/* we can even write (email: string, password: string) here and use it in the function below */}
  try {
    const res = await axios.post("http://localhost:3000/api/signin", {
      email: data.email,
      password: data.password,
    });

// similar one
//  const Signin = async (email: string, password: string) => {
//   try {
//     const res = await axios.post("http://localhost:3000/api/signin", { email, password });

    

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
    await axios.post("http://localhost:3000/api/signup", {
      username: data.username,
      email: data.email,
      password: data.password,
    });

    return { ok: true };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { ok: false, message: error.response?.data?.message };
    }
    return { ok: false };
  }
};
  const Logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) return;

  //     try {
  //       const res = await axios.get("http://localhost:3000/api/auth/me", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       setUser(res.data.user);
  //     } catch {
  //       localStorage.removeItem("token");
  //     }
  //   };

  //   loadUser();
  // }, []);



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
