import { UseMutationResult } from "@tanstack/react-query";

export interface ErrorMap {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export interface AuthContextType {
  user: any;
  errors: Partial<ErrorMap>;
  login: (data: {email: string, password: string}, setEmail: Function, setPassword: Function) => void;
  logout: () => void;
  register: (data: any) => void;
  getUser: () => Promise<void>;
  loginMutation: UseMutationResult;
  registerMutation: UseMutationResult;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    setEmail: Function;
    setPassword: Function;
    setConfirmPassword: Function;
    setName: Function;
  }
  