import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export default function NavBar() {
  const linkStyle =
    "text-[16px] text-dimgray py-[18px] px-[16px] mx-1 font-semibold uppercase rounded transition-all ease-in delay-100 hover:text-white hover:bg-midnightblue";

  return (
    <nav className="bg-white flex justify-between items-center py-5 px-14 w-full flex-wrap">
      <Link href={"/"}>
        <Image
          src="/icon/fixup.svg"
          height={59}
          width={139}
          alt={"Fixup Roofing & Construction Logo"}
        />
      </Link>
      <div className="px-8 flex flex-wrap">
        <Link href={"/about"} className={linkStyle}>
          About Us
        </Link>
        <div className={`services-section relative ${linkStyle}`}>
          <Link href={"/services"} className="flex items-center">
            Services <FaChevronDown className="text-xs ml-2" />
          </Link>
          {/* <div className="services absolute bg-midnightblue text-white rounded uppercase px-6 hover:flex flex-col w-[240px] top-0 left-0 hidden">
            <Link href={"/services/air-conditioning"} className="x">
              Air Conditioning
            </Link>
            <Link href={"/services/commercial-roofing"} className="x">
              Commercial Roofing 
            </Link>
            <Link href={"/services/residential-roofing"} className="x">
              Residential Roofing
            </Link>
            <Link href={"/services/solar-panels"} className="x">
              Solar Panels 
            </Link>
            <Link href={"/services/windows-and-doors"} className="x">
              Windows and Doors 
            </Link>
          </div> */}
        </div>
        <Link href={"/locations"} className={`${linkStyle}  flex items-center`}>
          Locations <FaChevronDown className="text-xs ml-2" />
        </Link>
        {/* <div className="locations absolute bg-midnightblue text-white rounded uppercase px-6 flex flex-col w-[240px]">
          <Link href={"/services/fort-lauderdale"} className="x">
            Fort Lauderdale
          </Link>
          <Link href={"/services/hollywood"} className="x">
            Hollywood 
          </Link>
          <Link href={"/services/miramar"} className="x">
            Miramar 
          </Link>
          <Link href={"/services/pembroke-pines"} className="x">
            Pembroke Pines 
          </Link>
          <Link href={"/services/pompano-beach"} className="x">
            Pompano Beach 
          </Link>
        </div> */}
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
      <Link
        href={"/estimates"}
        className="text-[16px] p-[18px] text-white bg-forestgreen rounded uppercase font-semibold transition-all ease-in delay-100 hover:bg-midnightblue"
      >
        Free Estimates
      </Link>
    </nav>
  );
}