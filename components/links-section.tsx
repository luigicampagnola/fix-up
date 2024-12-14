import Image from "next/image";
import { LinksContact, LinksList, LinksSocialMedia } from "./types";
import { FaEnvelope, FaFacebook, FaGooglePlusG, FaMapMarkerAlt, FaPhone, FaYelp } from "react-icons/fa";
import Link from "next/link";

interface Props {
  logo?: { url: string };
  links?: LinksList[];
  contact?: LinksContact;
  social?: LinksSocialMedia;
}

export default function LinksSection({ logo, links, contact, social }: Props) {
  const STRAPI_URL = "http://localhost:1337/"; // change this in the envs

  return (
    <section className="links-section bg-white w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center">
      <div className="contact-info">
        {logo && (
          <div className="mt-[20px] lg:mt-0 w-full h-full lg:h-[650px] pr-[10px]">
            <Image
              className="rounded-lg object-cover h-full"
              src={`${STRAPI_URL}${logo.url}`}
              alt={"fixup"}
              width={625}
              height={265}
            />
          </div>
        )}
        {contact && (
          <div className="flex flex-col">
            <a href={`tel:${contact.phoneNumber?.href}`} className="flex items-center space-x-1">
              <FaPhone />
              <span>{contact.phoneNumber?.label}</span>
            </a>
            <a href={`mailto:${contact.email?.emailHref}`} className="flex items-center space-x-1">
              <FaEnvelope />
              <span>{contact.email?.label}</span>
            </a>
            <a href={contact.address?.href} className="flex items-center space-x-1">
              <FaMapMarkerAlt />
              <span>{contact.address?.label}</span>
            </a>
          </div>
        )}
        {social && (
          <div className="flex">
            <a href={social.facebook} className="flex bg-forestgreen">
              <FaFacebook className="bg-white" />
            </a>
            <a href={social.yelp} className="flex bg-forestgreen">
              <FaYelp className="bg-white" />
            </a>
            <a href={social.googlePlus} className="flex bg-forestgreen">
              <FaGooglePlusG className="bg-white" />
            </a>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-between">
        {links && 
          links.map((link) => <div key={link.title}>
            <p>{link.title}</p>
            {link.links.map((info) => <Link key={info.label} href={info.url}>{info.label}</Link> )}
          </div>)
        }
      </div>
    </section>
  );
}