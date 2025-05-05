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

interface RegisterMutationProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginMutationProps {
  email: string;
  password: string;
}

export const AuthProvider: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState<Partial<ErrorMap>>({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      await csrf();
      const response = await axiosClient.get("/api/user");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const loginMutation = useMutation({
    mutationFn: async (data: LoginMutationProps) => {
      await csrf();
      const loginData = await axiosClient.post("/login", data);
      return loginData;
    },
    onSuccess: async () => {
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

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await csrf();
      await axiosClient.post("/logout");
    },
    onSuccess: async () => {
      setUser(null);
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
    mutationFn: async (data: RegisterMutationProps) => {
      await csrf();
      return await axiosClient.post("/register", data);
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

  const logout = () => logoutMutation.mutate();

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
        logout,
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
