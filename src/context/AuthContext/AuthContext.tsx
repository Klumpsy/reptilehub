import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";
import axiosClient from "../../axios/config";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { csrf } from "../../axios/config";
import { AuthContextType, ErrorMap, RegisterData } from "./types";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState<Partial<ErrorMap>>({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      csrf();
      const { data } = await axiosClient.get("/api/user");
      setUser(data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      await csrf();
      return axiosClient.post("/login", data);
    },
    onSuccess: async () => {
      await csrf();
      await getUser();
      setErrors({});
      navigate("/");
    },
    onError: (error: AxiosError<{ errors: ErrorMap }>) => {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An unexpected error occurred" });
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: { name; email; password; password_confirmation }) => {
      return csrf().then(() => axiosClient.post("/register", data));
    },
    onSuccess: () => {
      setErrors({});
      navigate("/login");
    },
    onError: (error: AxiosError<{ errors: ErrorMap }>) => {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An unexpected error occurred" });
      }
    },
  });

  const login = (
    data: { password: string; email: string },
    setEmail: Function,
    setPassword: Function
  ) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        setEmail("");
        setPassword("");
        getUser();
        navigate("/");
      },
    });
  };

  const register = (data: RegisterData) => {
    const {
      setEmail,
      setPassword,
      setConfirmPassword,
      setName,
      ...registerData
    } = data;

    registerMutation.mutate(registerData, {
      onSuccess: () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        navigate("/login");
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        login,
        register,
        getUser,
        loginMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext(): AuthContextType {
  return useContext(AuthContext);
}
