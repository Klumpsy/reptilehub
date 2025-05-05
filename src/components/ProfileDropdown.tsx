import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import useAuthContext from "../context/AuthContext";

const ProfileDropdown: React.FunctionComponent = () => {
  const { user, logout } = useAuthContext();

  return (
    <>
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="text-sm bg-gray-800  focus:ring-4 focus:ring-gray-300 hover:cursor-pointer"
        type="button"
      >
        <span className="sr-only">Open user menu</span>
        <IoPersonCircle size={30} />
      </button>
      <div
        id="dropdownAvatar"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>Bart Klumpers</div>
          <div className="font-medium truncate">bart_klumperman@live.nl</div>
        </div>
        {user && (
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My profile
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My reptiles
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                My terrariums
              </a>
            </li>
          </ul>
        )}
        <div className="py-2">
          {!user && (
            <a
              href="/login"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Login
            </a>
          )}
          {user && (
            <button
              onClick={() => logout()}
              className="block px-4 py-2 text-sm text-red-700 dark:text-red-200 dark:hover:text-red-400 hover:cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;
