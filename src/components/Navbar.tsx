import React from "react";
import logo from "../assets/images/logo.png";
import pagesData from "../pages/pagesData";
import { NavLink } from "react-router";
import ProfileDropdown from "./ProfileDropdown";

const Navbar: React.FunctionComponent = () => {
  return (
    <nav className="bg-gray-800 text-white sticky w-full p-2 mb-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={logo} className="max-w-20 mr-2" />
            <div className="text-xl font-bold text-main-green">Reptile hub</div>
          </a>
          <div>
            <ul className="flex">
              {pagesData.map((page) => (
                <li className="ml-3 hover:text-main-green">
                  <NavLink to={page.path}>{page.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
