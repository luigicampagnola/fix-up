'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaChevronDown, FaPlus } from "react-icons/fa";

export default function NavBar() {
  const linkStyle =
    "text-[16px] text-dimgray py-[18px] px-[16px] mx-1 font-semibold uppercase rounded transition-all ease-in delay-100 hover:text-white hover:bg-midnightblue";
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="bg-white flex items-center w-full flex-wrap">
      <div className="flex flex-wrap justify-between items-center w-full py-5 px-5 md:px-14 relative">
        <Link href={"/"}>
          <Image
            src="/icon/fixup.svg"
            height={59}
            width={139}
            alt={"Fixup Roofing & Construction Logo"}
          />
        </Link>
        <div className="px-8 hidden xl:flex flex-wrap">
          <Link href={"/about"} className={linkStyle}>
            About Us
          </Link>
          <div className={`services-section relative ${linkStyle}`}>
            <Link href={"/services"} className="flex items-center">
              Services <FaChevronDown className="text-xs ml-2" />
            </Link>
          </div>
          <Link
            href={"/locations"}
            className={`${linkStyle}  flex items-center`}
          >
            Locations <FaChevronDown className="text-xs ml-2" />
          </Link>
          <Link href={"/financing"} className={linkStyle}>
            Financing
          </Link>
          <Link href={"/projects"} className={linkStyle}>
            Projects
          </Link>
          <Link href={"/blog"} className={linkStyle}>
            Blog
          </Link>
        </div>
        <div className="free-estimate flex items-center">
          <button className="bg-midnightblue block xl:hidden py-[7px] px-[5px] md:mr-6 rounded hover:bg-dimgray" onClick={() => setOpenMenu(!openMenu)}>
            <FaBars className={`${openMenu ? 'hidden' : 'block'} w-6 h-5`} />
            <FaPlus className={`${openMenu ? 'block' : 'hidden'} rotate-45 w-6 h-5`} />
          </button>
          <Link
            href={"/estimates"}
            className="text-[16px] p-[18px] text-white hidden md:block bg-forestgreen rounded uppercase font-semibold transition-all ease-in delay-100 hover:bg-midnightblue"
          >
            Free Estimates
          </Link>
        </div>
      </div>
      <div className={`mobile-menu w-full transition-all ease-in-out duration-75 flex xl:hidden bg-midnightblue flex-col ${openMenu ? 'flex xl:hidden' : 'hidden'}`}>
          <Link href={"/about"} className="uppercase text-[15px] px-10 py-[10px] border-b border-solid border-white font-medium hover:bg-forestgreen">
            About Us
          </Link>
          <div className={`services-dropdown uppercase text-[15px] px-10 py-[10px] border-b border-solid border-white font-medium hover:bg-forestgreen focus:bg-forestgreen`}>
            <Link href={"/services"} className="flex items-center">
              Services <FaChevronDown className="text-xs ml-2" />
            </Link>
          </div>
          <div className={`location-dropdown uppercase text-[15px] px-10 py-[10px] border-b border-solid border-white font-medium hover:bg-forestgreen focus:bg-forestgreen`}>
            <Link href={"/services"} className="flex items-center">
              Services <FaChevronDown className="text-xs ml-2" />
            </Link>
          </div>
          <Link href={"/financing"} className="uppercase text-[15px] px-10 py-[10px] border-b border-solid border-white font-medium hover:bg-forestgreen">
            Financing
          </Link>
          <Link href={"/projects"} className="uppercase text-[15px] px-10 py-[10px] border-b border-solid border-white font-medium hover:bg-forestgreen">
            Projects
          </Link>
          <Link href={"/blog"} className="uppercase text-[15px] px-10 py-[10px] border-b border-solid border-white md:border-none font-medium hover:bg-forestgreen">
            Blog
          </Link>
          <Link href={"/estimates"} className="block md:hidden uppercase text-[15px] px-10 py-[10px] font-medium hover:bg-forestgreen">
            Free Estimates
          </Link>
        </div>
    </nav>
  );
}
