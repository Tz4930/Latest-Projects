"use client";
import React, { useState, useEffect } from "react";
import { MdOutlineLogout, MdOutlineMenu } from "react-icons/md";
import { FaRegFolder, FaSearch } from "react-icons/fa";
import { TbChartBar } from "react-icons/tb";
import { HiOutlineCursorClick } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";
import { RiFolderAddFill } from "react-icons/ri";
import TagModal from "../Modal/TagModal";
type SidebarProps = {
  handleFilter: (status: string | null) => void;
  handleSearch: (query: string) => void; // Add handleSearch prop
};

const Sidebar = ({ handleFilter, handleSearch }: SidebarProps) => {
  const [visible, setVisible] = useState(false);
  const [tags, setTags] = useState([]);
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleButtonClick = (status: string | null) => {
    handleFilter(status);
  };

  const handleLogout = async () => {
    try {
      console.log("Attempting to log out...");
      const response = await fetch("/api/logout", { method: "POST" });
      const data = await response.json();

      if (response.ok) {
        // Clearing localStorage
        localStorage.removeItem("token");
        // Redirect to login or any other page
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/api/tag");
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();
        setTags(data.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);
  return (
    <div>
      <div className="border-r border-custom-border bg-custom-bg w-[263px] h-screen pl-[30px] pt-[14px]">
        <div className="flex flex-col justify-start item-center">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="flex items-center ps-10 gap-2.5 flex-[1_0_0] self-stretch border border-zinc-400 px-4 py-[17px] rounded-[30px] border-solid w-[213px] h-10 text-xs not-italic font-medium"
              placeholder="Search QR Codes Here."
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className=" my-4 border-b border-gray-100 pb-4 pr-8">
            <h3 className="pl-5 text-[12px] text-gray-800 group-hover:text-white font-semibold ">
              MY QR CODES
            </h3>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#00BFFF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineMenu className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                <button type="button" onClick={() => handleButtonClick(null)}>
                  All
                </button>
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#00BFFF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <TbChartBar className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                <button type="button" onClick={() => handleButtonClick("true")}>
                  Active
                </button>
              </h3>
            </div>
            <div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#00BFFF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <HiOutlineCursorClick className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                <button
                  type="button"
                  onClick={() => handleButtonClick("false")}
                >
                  Paused
                </button>
              </h3>
            </div>
          </div>
          <div className=" my-4 border-b border-gray-100 pb-4 pr-8">
            <h3 className="pl-5 text-[12px] text-gray-800 group-hover:text-white font-semibold ">
              MY FOLDERS
            </h3>
            {!tags.length ? (
              <>
              {/* <div className="flex  mb-1 justify-start items-center gap-4 pl-5  px-2 rounded-md group m-auto"><RiFolderAddFill className="text-2xl text-gray-600 " /></div> */}
              </>
            ) : (
              tags.map((element, index) => {
                const { folderName } = element;
                return (
                  <div
                    className="flex  mb-1 justify-start items-center gap-4 pl-5  p-2 rounded-md group m-auto"
                    key={index}
                  >
                    <FaRegFolder className="text-2xl text-gray-600 " />
                    <h3 className="text-base text-gray-800  font-semibold ">
                      {folderName}
                    </h3>
                  </div>
                );
              })
            )}
          </div>
          <button
            type="button"
            onClick={showModal}
            className="flex w-[213px] h-[40px] justify-center items-center gap-2.5 rounded px-4 py-2 bg-[#00BFFF] font-manrope text-white text-base not-italic font-bold leading-[normal]"
          >
            Create Folder
          </button>
          <TagModal visible={visible} onClose={handleCancel} />

          {/* setting  */}
          <div className=" my-4 border-b border-gray-100 pb-4 pr-8">
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#00BFFF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <CiSettings className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                Settings
              </h3>
            </div>
            <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-[#00BFFF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
              <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
              <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                <button type="submit" onClick={handleLogout}>
                  Logout
                </button>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
