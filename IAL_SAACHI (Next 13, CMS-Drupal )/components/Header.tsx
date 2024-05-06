'use client'
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <>
      <div className="overflow-hidden ">
        <div className="h-[6em] w-screen flex items-center justify-center sm:justify-start sm:mx-[6em] flex-col sm:flex-row">
          <Link href="/">
            <img src="/logo_large.png"  alt="Logo of IAL-Sachi" className="w-[240px] h-[18px]"/>
          </Link>
          <span className="text-[#C6C6C6] text-[14px] sm:text-lg sm:float-left relative sm:ml-[1.25em] pt-3 sm:pl-5 sm:border-l-[black] sm:border-l-[1px] sm:border-solid -top-1">
            Pakistan
          </span>
        </div>
      </div>
    </>
  );
}
