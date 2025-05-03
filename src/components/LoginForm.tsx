"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext/AuthContext";

const LoginForm: React.FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, loginMutation, errors } = useAuthContext();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email, password }, setEmail, setPassword);
  };

  return (
    <form className="min-w-sm mx-auto" onSubmit={handleLogin}>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          ref={inputRef}
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="name@flowbite.com"
        />
        {errors.email && (
          <span className="text-red-400 text-sm">{errors.email}</span>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
        />
        {errors.password && (
          <span className="text-red-400 text-sm">{errors.password}</span>
        )}
      </div>

      <div className="flex justify-between mb-5">
        <div className="flex items-center">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <div className="text-sm font-medium text-green-400 hover:text-green-500 cursor-pointer">
          <Link to="/register">No account yet? Sign up here</Link>
        </div>
      </div>
      <div className="m-2 text-sm font-medium text-red-400">
        {errors.general && (
          <span className="text-red-400 text-sm">{errors.general}</span>
        )}
      </div>
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800 cursor-pointer"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
