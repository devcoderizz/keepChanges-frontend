import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import Hamburger from "hamburger-react";
 
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";


const items = [
  {
    key: "1",
    label: (
      <Link
        rel="noopener noreferrer"
        to="/fundraisers"
      >
        Fundraisers
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Gallery
      </a>
    ),
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Be an Agent
      </a>
    ),
    disabled: true,
  },
];

const Navbar = () => {
 
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [logoutCompleted, setLogoutCompleted] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate()
  // const setUser = useSetRecoilState(userAtom)
  const localData = JSON.parse(localStorage.getItem("UserData"))

  // console.log("setUser",setUser);
  // console.log("localData",localData);


 
  const handleProfileClick = () => {
    setProfileOpen(!isProfileOpen);
  };

   

  useEffect(() => {
    if (location.pathname === "/auth") {
      handleProfileClick();
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("UserData");
    navigate('/auth');
    window.location.reload(false);
    toast.success("User logged out successfully", { autoClose: false });
    
}

//   useEffect(() => {
//     handleLogout();
//     const timeoutId = setTimeout(() => {
//         toast.success("User logged out successfully");
//     }, 2000);

//     return () => clearTimeout(timeoutId);
// }, []);

  return (
    <nav className=" bg-white border-gray-200 w-full py-5 md:py-0 px-10 md:px-20
    ">
      
      <div className="flex items-center justify-between mx-auto md:py-4">

       <Toaster position="top-right"  toastOptions={{duration:4000, style: {
      width: '150px', 
      height:'60px',
      top: '20px', 
      right: '20px',
    }, }}   /> 


      <div className="flex items-center space-x-3    mt-1 gap-3">
          <Link to="/" className="text-2xl font-extrabold text-red-500 text-nowrap">
            Keep Changes
          </Link>
          <div
            className="flex items-center justify-center w-10 h-10 text-indigo-500 profile-button md:hidden   "
            
          >
            <FaCircleUser size={35} onClick={handleProfileClick} />
          </div>
        </div>
        <div className="hidden md:flex"> 
          <ul className="flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 gap-10">
            <Dropdown
              menu={{
                items,
              }}
              className="w-[100px] items-center"
              overlayStyle={{ arrow: false }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Programs
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Link className="text-black font-semibold mx-4">Gallery</Link>
            <Link className="text-black font-semibold mx-4">About</Link>
          </ul></div>

        <div className="flex items-center md:hidden">
          <Hamburger toggled={isBurgerOpen} toggle={setBurgerOpen} />
        
        </div>

        <div
          className={`${
            isBurgerOpen ? "block" : "hidden"
          } md:hidden w-full bg-white fixed top-[68px] left-0 right-0 z-20`}
        >
          <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 gap-10">
            <Dropdown
              menu={{
                items,
              }}
              className="w-[100px] items-center"
              overlayStyle={{ arrow: false }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Programs
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Link className="text-black font-semibold">Gallery</Link>
            <Link className="text-black font-semibold">About</Link>
          </ul>
        </div>
 




        <div ref={profileRef} className="hidden md:flex items-center space-x-3 md:space-x-0 gap-4">
          {localData ? <Link to={'/startFundraiser'} className="p-2 font-semibold bg-[#EF5757] text-white rounded-lg hover:bg-[#d84f4f]">
            Start a Fundraiser
          </Link> : <Link to={'/auth'} onClick={()=>{ toast.error("You have to login first");setProfileOpen(false)} } className="p-2 font-semibold bg-[#EF5757] text-white rounded-lg hover:bg-[#d84f4f]">
            Start a Fundraiser
          </Link>}
          <span onClick={()=>{navigate('/user-profile')}} className="capitalize hidden md:block cursor-pointer">{localData && "Welcome,"} <strong className="text-[#EF5757]"> {localData?.name}</strong></span>
          <button
            type="button"
            className=" items-center justify-center w-10 h-10 text-indigo-500 hidden md:block"
            onClick={handleProfileClick}
          >

            <FaCircleUser size={35} />
          </button>
        </div>

        {!isProfileOpen && (<>
        <div onClick={handleProfileClick} className="absolute w-[90vw] h-screen  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2  "></div>
          <div className="absolute top-16 right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10 ">
            <div className="py-1">
              <button onClick={()=>navigate('/auth') 
                
              } >
                {localData===null ? <Link  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ">
                Login
              </Link> :<button onClick={()=>{navigate('/user-profile')}}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ">
                {localData.name}
              </button>

                }
              
              </button>
              {localData && <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Logout
              </button>}
              
            </div>
          </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
