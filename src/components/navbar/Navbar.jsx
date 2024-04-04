/* eslint-disable react/prop-types */
import { SiCodesignal } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../buttons/Button";
import { useState } from "react";
import useUser from "../../hooks/useUser";

const Navbar = ({ links }) => {
  const [optionsToggle, setoptionsToggle] = useState(false);
  const { logout, user } = useUser();
  function toggleOptions() {
    setoptionsToggle((prev) => !prev);
  }
  return (
    <div
      className={`flex items-center justify-between ${!links ? "bg-slate-700" : "bg-transparent"} px-8 py-6 text-white `}
    >
      <Link to={"/"} className="inline-flex items-center justify-center gap-1">
        <SiCodesignal size={25} />
        <h2 className="text-2xl font-semibold tracking-wide">Codyshare</h2>
      </Link>
      {links != null ? (
        !user ? (
          <ul className="flex items-center gap-5 text-gray-300">
            <li>
              <Link to={"/signup"}>Sign Up</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          </ul>
        ) : (
          <div className="flex items-center gap-5">
            <Button
              size={"sm"}
              leftIcon={<FaUsers size={18} />}
              varient={"outline"}
            >
              Share
            </Button>
            <div className="relative">
              <p
                className="cursor-pointer text-lg font-medium"
                onClick={toggleOptions}
              >
                User
              </p>
              {optionsToggle && (
                <ul className="absolute -right-1 top-10 z-20 w-48 space-y-2 rounded bg-white p-3 text-blue-500">
                  <li className="hover:underline">
                    <Link to={"/codes"}>Your Codeshares</Link>
                  </li>
                  <li className="hover:underline">
                    <Link to={"/settings"}>Account Settings</Link>
                  </li>
                  <li
                    onClick={() => logout()}
                    className="cursor-pointer hover:underline"
                  >
                    Log Out
                  </li>
                </ul>
              )}
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default Navbar;
