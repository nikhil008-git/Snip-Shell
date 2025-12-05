import { useState } from "react";
import { DiYii } from "react-icons/di";
import { LuGithub } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { Logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    Logout();
    navigate("/");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed">
        <div className="h-screen w-[300px] bg-black text-white rounded-r-sm border border-black shadow-lg">
          <div className="font-instrument text-2xl p-4 border-b border-black text-center flex flex-row gap-2 items-center">
            <DiYii /> Snip-Shell
          </div>

          <div className="p-4">
            <div className="bg-black border border-gray-800 rounded-lg p-4 mb-6">
              <h3 className="font-instrument text-xl mb-3">Filters</h3>
              <ul className="space-y-2 text-gray-300 font-instrument">
                <li className="border border-gray-700 p-2 rounded-md hover:bg-gray-800 cursor-pointer">
                  Links (coming soon)
                </li>
                <li className="border border-gray-700 p-2 rounded-md hover:bg-gray-800 cursor-pointer">
                  Collections (upcoming)
                </li>
              </ul>
            </div>
          </div>

          <div className="absolute bottom-0 w-full pb-4">
            <div className="flex flex-row justify-center gap-x-7 items-center p-4 border-t border-white hover:bg-gray-300 bg-white text-black font-bold mx-auto rounded-md h-10 w-50">
              <div className="font-instrument text-lg">Connect</div>
              <div className="flex flex-row gap-x-3">
                <div className="cursor-pointer">
                  <a href="https://github.com/nikhil008-git/Snip-Shell"><LuGithub /></a>
                </div>
                <div className="cursor-pointer">
                  <a href="https://x.com/nick_realm_01"><FaXTwitter /></a>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex flex-row justify-center gap-1 items-center mt-5 mx-auto h-10 w-50 rounded-md bg-white hover:bg-gray-300 cursor-pointer text-black font-bold font-instrument text-lg"
            >
              Logout <IoIosLogOut />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed w-full bg-black text-white z-50 shadow-md">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2 text-xl font-instrument">
            <DiYii /> Snip-Shell
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white text-2xl font-bold"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {mobileOpen && (
          <div className="bg-black border-t border-gray-800 p-4 space-y-4">
            <h3 className="font-instrument text-xl mb-3">Filters</h3>
            <ul className="space-y-2 text-gray-300 font-instrument">
              <li className="border border-gray-700 p-2 rounded-md hover:bg-gray-800 cursor-pointer">
                Links (coming soon)
              </li>
              <li className="border border-gray-700 p-2 rounded-md hover:bg-gray-800 cursor-pointer">
                Collections (upcoming)
              </li>
            </ul>

            <div className="flex flex-row justify-center gap-x-7 items-center p-4 border-t border-white hover:bg-gray-300 bg-white text-black font-bold mx-auto rounded-md h-10 w-full">
              <div className="font-instrument text-lg">Connect</div>
              <div className="flex flex-row gap-x-3">
                <div className="cursor-pointer">
                  <a href="https://github.com/nikhil008-git/Snip-Shell"><LuGithub /></a>
                </div>
                <div className="cursor-pointer">
                  <a href="https://x.com/nick_realm_01"><FaXTwitter /></a>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex flex-row justify-center gap-1 items-center mt-5 mx-auto h-10 w-full rounded-md bg-white hover:bg-gray-300 cursor-pointer text-black font-bold font-instrument text-lg"
            >
              Logout <IoIosLogOut />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
