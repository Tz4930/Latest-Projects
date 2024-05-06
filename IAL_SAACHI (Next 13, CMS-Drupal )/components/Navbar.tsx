import Link from "next/link";
import React, { useState } from "react";
import type { MenuProps } from "antd";

export function Navbar() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };
  let Links = [
    { name: "HOME", link: "/" },
    { name: "NEWS", link: "/news" },
    { name: "WORK", link: "/work" },
    { name: "PEOPLE", link: "/people" },
    { name: "About Us", link: "/aboutus" },
    { name: "KNOWLEDGE", link: "/knowledge" },
  ];
  return (
    <>
      {/* <div className="navbar hidden md:block">
        <ul className="h-screen md:h-auto items-center md:flex">
          <li className="text-white py-2 ">
            <Link className="focus:text-[#9d2fa7]" href="/" onClick={() => setNavbar(!navbar)}>
              HOME
            </Link>
          </li>
          <li className="text-[1em] text-white py-2 ">
            <Link className="focus:text-[#fb4d40]" href="/news" onClick={() => setNavbar(!navbar)}>
              NEWS
            </Link>
          </li>
          <li className="text-[1em] text-white py-2 ">
            <Link className="focus:text-[#2295d2]" href="/work" onClick={() => setNavbar(!navbar)}>
              WORK
            </Link>
          </li>
          <li className="text-[1em] text-white py-2 ">
            <Link className="focus:text-[#9d2fa7]" href="/people" onClick={() => setNavbar(!navbar)}>
              PEOPLE
            </Link>
          </li>
          <li className="text-[1em] text-white py-2">
            <Link className="focus:text-[#fbbc2a] " href="/aboutus" onClick={() => setNavbar(!navbar)}>
            About Us
            </Link>
          </li>
          <li className="text-[1em] text-white py-2 ">
            <Link className="focus:text-[#fb2aa4]" href="/knowledge" onClick={() => setNavbar(!navbar)}>
              KNOWLEDGE
            </Link>
          </li>
        </ul>
      </div> */}
      <nav className="flex items-center flex-wrap bg-navbg w-screen ">
        <button
          className=" inline-flex p-3 font-sans font-normal text-navtxt lg:hidden ml-auto hover:text-white outline-none"
          onClick={handleClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            // viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div
          className={`${
            active ? "" : "hidden"
          }   w-full lg:inline-flex lg:flex-grow lg:mx-[6em]`}
        >
          {Links.map((link, index) => (
            <>
              <div className="lg:inline-flex text-[13px] flex flex-col lg:h-auto  lg:px-[1em]">
                <Link
                  href={link.link}
                  className={`lg:inline-flex w-full px-[1.2em] py-[1.2em] font-normal text-navtxt font-bold hover:bg-black hover:text-white `}
                >
                  {link.name}
                </Link>
              </div>
            </>
          ))}
        </div>
      </nav>
    </>
  );
}
