/* eslint-disable react/prop-types */
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const SideBar = ({ toggleSide, onClick }) => {
  return (
    <aside
      className={`h-[91vh] ${toggleSide ? "w-[20vw]" : "w-[3vw]"}  bg-gray-300 p-3`}
    >
      {/* icons on the top */}
      <div className="flex items-center justify-between">
        {/* icons options */}
        {toggleSide && (
          <div className="flex items-center gap-3">
            <div className="group relative cursor-pointer">
              <FaDownload size={20} color="black" />
              <small className="absolute top-6 hidden bg-black bg-opacity-65 p-1 transition-all delay-200 duration-500 ease-in-out group-hover:block">
                Download
              </small>
            </div>
            <div className="group relative cursor-pointer">
              <IoMdAdd size={25} color="black" className="cursor-pointer" />
              <small className="absolute top-6 hidden w-40 bg-black bg-opacity-65 p-1 transition-all delay-200 duration-500 ease-in-out group-hover:block">
                Create a new Codeshare
              </small>
            </div>
          </div>
        )}
        {/* icon for opening and closing the side bar */}
        <div className="cursor-pointer" onClick={onClick}>
          {toggleSide ? (
            <RiMenuUnfoldLine size={25} color="black" />
          ) : (
            <RiMenuFoldLine size={25} color="black" />
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
