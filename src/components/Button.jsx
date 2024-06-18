import { useState } from "react";
import { MdKeyboardArrowDown, MdOutlineMoreVert } from "react-icons/md";
import { Link } from "react-router-dom";

const Button = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const localData = JSON.parse(localStorage?.getItem("UserData"));
  const admin = localData?.roles[1]?.id || localData?.roles[0]?.id === 501

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };


  return (
    <div className="relative inline-block text-left">
      <div className="flex flex-row items-center gap-3">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex items-center gap-2 justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Dashboard
          <MdKeyboardArrowDown />
        </button>
       
      </div>

      {dropdownOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <Link
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
             
            >
              User Dashbaord
            </Link>
          </div>
          { admin &&
          <div className="py-1" role="none">
            <Link
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              to={"/admin/dashboard"}
              
            >
              Admin Dashbaord
            </Link>
          </div>
            }
        </div>
      )}

{dropdownOpen2 && (
        <div
        className="origin-top-right absolute -right-0 mt-2 md:w-auto w-[100px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="py-1 md:w-auto w-[100px]" role="none">
          <Link to={'/fundraiser-options'}
            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            role="menuitem"
          >
            More
          </Link>
        </div>
      </div>
      )}
    </div>
  );
};

export default Button;
