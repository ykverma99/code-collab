/* eslint-disable react/prop-types */
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { HiMiniPlay } from "react-icons/hi2";
import { IoChatbubbles } from "react-icons/io5";

const SideBar = ({
  toggleSide,
  handleToggle,
  handleChat,
  handleCodeRun,
  children,
}) => {
  return (
    <aside
      className={`h-[91vh] ${toggleSide ? "w-[20vw]" : "w-[3vw]"}  bg-gray-300 p-3`}
    >
      {/* icons on the top */}
      <div
        className={`flex ${toggleSide ? "flex-row" : "flex-col-reverse"} items-center justify-between gap-5`}
      >
        {/* icons options */}
        <div
          className={`flex ${toggleSide ? "flex-row" : "flex-col"} items-center gap-5`}
        >
          <div className="group relative cursor-pointer">
            <FaDownload size={20} color="black" />
            <small
              className={`absolute ${toggleSide ? "top-6 bg-black bg-opacity-65" : "right-10 top-0 bg-white text-black"}  hidden  p-1 transition-all delay-200 duration-500 ease-in-out group-hover:block`}
            >
              Download
            </small>
          </div>
          <div className="group relative cursor-pointer">
            <IoMdAdd size={25} color="black" className="cursor-pointer" />
            <small
              className={`absolute ${toggleSide ? "bg  top-6 bg-black bg-opacity-65" : "right-10 top-0 bg-white text-black"} hidden w-[9.5rem] p-1 transition-all delay-200 duration-500 ease-in-out group-hover:block`}
            >
              Create a new Codeshare
            </small>
          </div>
          <div
            onClick={handleCodeRun}
            className="group relative cursor-pointer"
          >
            <HiMiniPlay size={25} color="black" className="cursor-pointer" />
            <small
              className={`absolute ${toggleSide ? "bg  top-6 bg-black bg-opacity-65" : "right-10 top-0 bg-white text-black"} hidden w-16 p-1 transition-all delay-200 duration-500 ease-in-out group-hover:block`}
            >
              Run Code
            </small>
          </div>
          <div onClick={handleChat} className="group relative cursor-pointer">
            <IoChatbubbles size={25} color="black" className="cursor-pointer" />
            <small
              className={`absolute ${toggleSide ? "bg  top-6 bg-black bg-opacity-65" : "right-10 top-0 bg-white text-black"} hidden  p-1 transition-all delay-200 duration-500 ease-in-out group-hover:block`}
            >
              Chat
            </small>
          </div>
        </div>
        {/* icon for opening and closing the side bar */}
        <div className="cursor-pointer" onClick={handleToggle}>
          {toggleSide ? (
            <RiMenuUnfoldLine size={25} color="black" />
          ) : (
            <RiMenuFoldLine size={25} color="black" />
          )}
        </div>
      </div>
      {children}
    </aside>
  );
};

export default SideBar;
