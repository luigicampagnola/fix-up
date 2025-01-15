'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaPlus, FaPhone, FaEnvelope, FaMapMarkerAlt, FaGoogle, FaFacebook, FaYelp } from "react-icons/fa";

export default function NavBar() {
 const linkStyle = "text-[16px] text-dimgray py-[18px] px-[16px] mx-1 font-semibold uppercase rounded transition-all duration-75 hover:text-white hover:bg-midnightblue";
 const [openMenu, setOpenMenu] = useState(false);
 const [servicesOpen, setServicesOpen] = useState(false);
 const [locationsOpen, setLocationsOpen] = useState(false);
 const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
 const [showNav, setShowNav] = useState(true);

 const handleMobileMenuClick = () => {
   setOpenMenu(false);
   setServicesOpen(false);
   setLocationsOpen(false);
   setSelectedLocation(null);
 };  

 useEffect(() => {
   let scrollTimeout: NodeJS.Timeout;
   
   const handleScroll = () => {
     setShowNav(false);
     clearTimeout(scrollTimeout);
     scrollTimeout = setTimeout(() => {
       setShowNav(true);
     }, 150);
   };

   window.addEventListener('scroll', handleScroll);
   return () => {
     window.removeEventListener('scroll', handleScroll);
     clearTimeout(scrollTimeout);
   };
 }, []);

 const services = [
   { name: "AIR CONDITIONING", href: "/services/air-conditioning" },
   { name: "COMMERCIAL ROOFING", href: "/services/commercial-roofing" },
   { name: "RESIDENTIAL ROOFING", href: "/services/residential-roofing" },
   { name: "SOLAR PANELS", href: "/services/solar-panels" },
   { name: "WINDOWS AND DOORS", href: "/services/windows-and-doors" }
 ] as const;

 const locations = [
   {
     name: "BROWARD COUNTY",
     href: "/locations/broward-county",
     cities: ["FORT LAUDERDALE", "HOLLYWOOD", "MIRAMAR", "PEMBROKE PINES", "POMPANO BEACH"]
   },
   {
     name: "MIAMI-DADE COUNTY",
     href: "/locations/miami-dade-county",
     cities: ["CORAL GABLES", "HIALEAH", "KENDALL", "MIAMI", "MIAMI BEACH", "MIAMI GARDENS", "WESTCHESTER"]
   }
 ] as const;

 return (
   <div className={`fixed top-0 w-full z-50 transition-transform duration-100 ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
     {/* Top Bar */}
     <div className="bg-midnightblue text-white py-2 px-4 md:px-14">
       <div className="flex justify-center xl:justify-between items-center">
         <div className="hidden xl:flex items-center gap-4">
           <a href="tel:7862352435" className="flex items-center hover:text-forestgreen transition-colors">
             <FaPhone className="mr-2" />
             <span>(786) 235-2435</span>
           </a>
           <span className="text-white/50">|</span>
           <a href="mailto:cs@fixuproofing.com" className="flex items-center hover:text-forestgreen transition-colors">
             <FaEnvelope className="mr-2" />
             <span>cs@fixuproofing.com</span>
           </a>
           <span className="text-white/50">|</span>
           <div className="flex items-center">
             <FaMapMarkerAlt className="mr-2 text-white" />
             <a href="https://maps.app.goo.gl/di85NMJoy3pPYd387" target="_blank" rel="noopener noreferrer" className="hover:text-forestgreen transition-colors">
               6917 NW 77th Ave, Miami, FL 33166
             </a>
           </div>
         </div>
         <div className="flex items-center gap-2">
           <a href="tel:7862352435" className="w-8 h-8 flex items-center justify-center rounded-full bg-forestgreen hover:bg-white text-white hover:text-midnightblue transition-all">
             <FaPhone className="w-4 h-4" />
           </a>
           <a href="mailto:cs@fixuproofing.com" className="w-8 h-8 flex items-center justify-center rounded-full bg-forestgreen hover:bg-white text-white hover:text-midnightblue transition-all">
             <FaEnvelope className="w-4 h-4" />
           </a>
           <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-forestgreen hover:bg-white text-white hover:text-midnightblue transition-all">
             <FaGoogle className="w-4 h-4" />
           </a>
           <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-forestgreen hover:bg-white text-white hover:text-midnightblue transition-all">
             <FaFacebook className="w-4 h-4" />
           </a>
           <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-forestgreen hover:bg-white text-white hover:text-midnightblue transition-all">
             <FaYelp className="w-4 h-4" />
           </a>
         </div>
       </div>
     </div>

     {/* Main Navigation */}
     <nav className="bg-white flex items-center w-full flex-wrap">
       <div className="flex flex-wrap justify-between items-center w-full py-5 px-5 md:px-14 relative">
         <Link href={"/"} onClick={handleMobileMenuClick}>
           <Image
             src="/icon/fixup.svg"
             height={59}
             width={139}
             alt={"Fixup Roofing & Construction Logo"}
             className="h-auto"
           />
         </Link>

         {/* Desktop Navigation */}
         <div className="px-8 hidden xl:flex flex-wrap">
           <Link href={"/about"} className={linkStyle}>
             About Us
           </Link>

           {/* Services Dropdown */}
           <div className="relative group">
           <Link href="/services" className={`${linkStyle} flex items-center`}>
               Services <FaChevronDown className="text-xs ml-2" />
             </Link>
             <div className="absolute z-50 hidden group-hover:block w-64 bg-midnightblue rounded-lg overflow-hidden shadow-lg transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-75">
               {services.map((service, index) => (
                 <Link
                   key={service.name}
                   href={service.href}
                   className={`block px-6 py-4 text-white hover:bg-forestgreen transition-colors ${index === 0 ? 'bg-forestgreen' : ''}`}
                   onClick={handleMobileMenuClick}
                 >
                   {service.name}
                 </Link>
               ))}
             </div>
           </div>


           {/* Locations Dropdown */}
           <div className="relative group">
             <Link href="/locations" className={`${linkStyle} flex items-center`}>
               Locations <FaChevronDown className="text-xs ml-2" />
             </Link>
             <div 
               className="absolute z-50 hidden group-hover:block w-64 top-full left-0"
               onMouseLeave={() => setSelectedLocation(null)}
             >
               <div className="bg-midnightblue rounded-lg overflow-hidden shadow-lg transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                 {locations.map((location, index) => (
                   <div key={location.name}>
                     <Link
                       href={location.href}
                       className={`block px-6 py-4 text-white hover:bg-forestgreen flex justify-between items-center transition-colors ${index === 0 ? 'bg-forestgreen' : ''}`}
                       onMouseEnter={() => location.cities.length && setSelectedLocation(location.name)}
                     >
                       {location.name}
                       {location.cities.length > 0 && <span className="ml-2">›</span>}
                     </Link>
                   </div>
                 ))}
               </div>
               {selectedLocation && (
                 <div 
                   className="absolute left-64 top-0 w-64 bg-midnightblue rounded-lg overflow-hidden shadow-lg transform"
                   style={{ marginLeft: '1px' }}
                 >
                   {locations.find(loc => loc.name === selectedLocation)?.cities.map((city) => (
                     <Link
                       key={city}
                       href={`/locations/${selectedLocation.toLowerCase().replace(' ', '-')}/${city.toLowerCase().replace(' ', '-')}`}
                       className="block px-6 py-4 text-white hover:bg-forestgreen transition-colors"
                       onClick={handleMobileMenuClick}
                     >
                       {city}
                     </Link>
                   ))}
                 </div>
               )}
             </div>
           </div>

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

         {/* Mobile menu button and Free Estimates */}
         <div className="free-estimate flex items-center gap-4">
           <button 
             className="bg-midnightblue block xl:hidden py-[7px] px-[5px] rounded hover:bg-dimgray text-white"
             onClick={() => setOpenMenu(!openMenu)}
           >
             <FaBars className={`${openMenu ? 'hidden' : 'block'} w-6 h-5`} />
             <FaPlus className={`${openMenu ? 'block' : 'hidden'} rotate-45 w-6 h-5`} />
           </button>
           <Link
             href={"/estimates"}
             className="text-[16px] p-[18px] text-white hidden xl:block bg-forestgreen rounded uppercase font-semibold transition-all ease-in delay-100 hover:bg-midnightblue whitespace-nowrap"
           >
             Free Estimates
           </Link>
         </div>
       </div>

       {/* Mobile Navigation */}
       <div className={`mobile-menu w-full transition-all ease-in-out duration-75 flex xl:hidden bg-midnightblue flex-col text-white ${openMenu ? 'flex xl:hidden' : 'hidden'}`}>
         <Link 
           href={"/about"} 
           className="uppercase text-[15px] px-10 py-[10px] border-b border-solid border-white font-medium hover:bg-forestgreen"
           onClick={handleMobileMenuClick}
         >
           About Us
         </Link>

         {/* Mobile Services Dropdown */}
         <div className="border-b border-solid border-white">
           <button
             onClick={() => setServicesOpen(!servicesOpen)}
             className="w-full uppercase text-[15px] px-10 py-[10px] font-medium hover:bg-forestgreen text-left flex items-center justify-between"
           >
             Services
             <FaChevronDown className={`text-xs ml-2 transform transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
           </button>
           {servicesOpen && (
             <div className="bg-[#1a1f3a] border-t border-solid border-white">
               {services.map((service) => (
                 <Link
                   key={service.name}
                   href={service.href}
                   className="block uppercase text-[15px] px-12 py-[10px] font-medium hover:bg-forestgreen"
                   onClick={handleMobileMenuClick}
                 >
                   {service.name}
                 </Link>
               ))}
             </div>
           )}
         </div>

         {/* Mobile Locations Dropdown */}
         <div className="border-b border-solid border-white">
           <button
             onClick={() => setLocationsOpen(!locationsOpen)}
             className="w-full uppercase text-[15px] px-10 py-[10px] font-medium hover:bg-forestgreen text-left flex items-center justify-between"
           >
             Locations
             <FaChevronDown className={`text-xs ml-2 transform transition-transform ${locationsOpen ? 'rotate-180' : ''}`} />
           </button>
           {locationsOpen && (
             <div className="bg-[#1a1f3a] border-t border-solid border-white">
               {locations.map((location) => (
                 <div key={location.name}>
                   <Link
                     href={location.href}
                     className="block uppercase text-[15px] px-12 py-[10px] font-medium hover:bg-forestgreen"
                     onClick={handleMobileMenuClick}
                   >
                     {location.name}
                   </Link>
                   {location.cities.map((city) => (
                     <Link
                       key={city}
                       href={`/locations/${location.name.toLowerCase().replace(' ', '-')}/${city.toLowerCase().replace(' ', '-')}`}
                       className="block uppercase text-[15px] px-16 py-[10px] font-medium hover:bg-forestgreen bg-[#141729]"
                       onClick={handleMobileMenuClick}
                     >
                       {city}
                     </Link>
                   ))}
                 </div>
               ))}
             </div>
           )}
         </div>

         <Link 
           href={"/financing"} 
           className="uppercase text-[15px] px-10 py-[10px] border-b border-solid border-white font-medium hover:bg-forestgreen"
           onClick={handleMobileMenuClick}
         >
           Financing
         </Link>
         <Link 
           href={"/projects"} 
           className="uppercase text-[15px] px-10 py-[10px] border-b border-solid border-white font-medium hover:bg-forestgreen"
           onClick={handleMobileMenuClick}
         >
           Projects
         </Link>
         <Link 
           href={"/blog"} 
           className="uppercase text-[15px] px-10 py-[10px] border-b border-solid border-white font-medium hover:bg-forestgreen"
           onClick={handleMobileMenuClick}
         >
           Blog
         </Link>
         <Link 
           href={"/estimates"} 
           className="block xl:hidden uppercase text-[15px] px-10 py-[10px] font-medium hover:bg-forestgreen"
           onClick={handleMobileMenuClick}
         >
           Free Estimates
         </Link>
       </div>
     </nav>
   </div>
 );
}