import Image from 'next/image';
import { LinksContact, LinksList, LinksSocialMedia } from './types';
// import {
//   FaEnvelope,
//   FaFacebook,
//   FaGooglePlusG,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaYelp,
// } from "react-icons/fa";
import Link from 'next/link';

interface Props {
  logo?: { url: string };
  links?: LinksList[];
  contact?: LinksContact;
  social?: LinksSocialMedia;
}

export default function LinksSection({ logo, links, contact, social }: Props) {
  // const STRAPI_URL = "http://localhost:1337/"; // change this in the envs

  return (
    <section className='links-section py-[100px] bg-white w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center'>
      <div className='flex flex-col items-center lg:flex-row basis-11/12 w-11/12 lg:basis-9/12 lg:w-9/12 justify-between lg:max-w-7xl'>
        <div className='contact-info flex flex-col items-center lg:items-start w-full basis-full lg:basis-[23%] lg:w-4/12'>
          {logo && (
            <div className=' flex-col md:flex justify-center lg:justify-start mt-[20px] lg:mt-0 w-full pr-[10px]'>
              <div className='lg:flex'>
                <div className='flex justify-center'>
                  <Image
                    className='rounded-lg object-cover h-full'
                    src={logo.url}
                    alt={'fixup'}
                    width={200}
                    height={84}
                  />
                </div>
                <div className='flex justify-center lg:hidden'>
                  <a
                    href='https://www.bbb.org/south-east-florida/quote/request-fix-up-roofing-and-construction-llc-92033455/#buttonclick'
                    target='_blank'
                    rel='nofollow'
                  >
                    <img
                      src='https://seal-seflorida.bbb.org/request-a-quote/blue-badge-100-160-blue-bbb-92033455.png'
                      style={{ border: 0 }}
                      alt='Fix Up Roofing and Construction LLC BBB Business Review'
                    />
                  </a>
                </div>
              </div>
            </div>
          )}

          {contact && (
            <div className='flex flex-col items-center lg:items-start pt-[10px]'>
              <p className='flex transition-all items-center py-[5px] space-x-2 hover:text-forestgreen'>
                {contact.hashtag}
              </p>
              <a
                href={`tel:${contact.phoneNumber?.href}`}
                className='flex transition-all items-center py-[5px] space-x-2 hover:text-forestgreen'
              >
                {/* <FaPhone /> */}
                <span>{contact.phoneNumber?.label}</span>
              </a>
              <a
                href={`mailto:${contact.email?.emailHref}`}
                className='flex transition-all items-center py-[5px] space-x-2 hover:text-forestgreen'
              >
                {/* <FaEnvelope /> */}
                <span>{contact.email?.label}</span>
              </a>
              <a
                href={contact.address?.href}
                className='flex transition-all items-center py-[5px] space-x-2 hover:text-forestgreen'
              >
                {/* <FaMapMarkerAlt /> */}
                <span>{contact.address?.label}</span>
              </a>
            </div>
          )}
          {social && (
            <div className='flex pt-5 flex-wrap justify-center lg:justify-start h-full'>
              <div className='transition-all mr-2'>
                <a
                  href={social.facebook}
                  target='_blank'
                  className='flex transition-all text-[20px] hover:text-[25px] text-white hover:text-forestgreen bg-forestgreen hover:bg-midnightblue p-[10px] rounded-full'
                >
                  {/* <FaFacebook className="bg-transparent" /> */}
                </a>
              </div>
              <div className='transition-all mr-2'>
                <a
                  href={social.yelp}
                  target='_blank'
                  className='flex transition-all text-[20px] hover:text-[25px] text-white hover:text-forestgreen bg-forestgreen hover:bg-midnightblue p-[10px] rounded-full'
                >
                  {/* <FaYelp className="bg-transparent" /> */}
                </a>
              </div>
              <div className='transition-all mr-2'>
                <a
                  href={social.googlePlus}
                  target='_blank'
                  className='flex transition-all text-[20px] hover:text-[25px] text-white hover:text-forestgreen bg-forestgreen hover:bg-midnightblue p-[10px] rounded-full'
                >
                  {/* <FaGooglePlusG className="bg-transparent" /> */}
                </a>
              </div>
              <a
                href='tel:7862352435'
                className='flex transition-all text-[20px] hover:text-[25px] text-white hover:text-forestgreen bg-forestgreen hover:bg-midnightblue p-[10px] rounded-full'
              >
                {/* <FaPhone className="bg-transparent" /> */}
              </a>
            </div>
          )}
        </div>
        <div className='hidden lg:flex mb-[10rem] mr-[2rem]'>
          <a
            href='https://www.bbb.org/south-east-florida/quote/request-fix-up-roofing-and-construction-llc-92033455/#buttonclick'
            target='_blank'
            rel='nofollow'
          >
            <img
              src='https://seal-seflorida.bbb.org/request-a-quote/blue-badge-100-160-blue-bbb-92033455.png'
              style={{ border: 0 }}
              alt='Fix Up Roofing and Construction LLC BBB Business Review'
            />
          </a>
        </div>

        <div className='links flex justify-between w-full basis-full flex-wrap lg:basis-7/12 lg:w-7/12'>
          {links &&
            links.map((link) => (
              <div
                key={link.title}
                className='flex flex-col items-center pt-5 lg:pt-0 lg:items-start basis-full md:basis-4/12'
              >
                <p className='font-bold text-[18px] md:text-[20px] mb-7'>
                  {link.title}
                </p>
                {link.links.map((info) => (
                  <Link
                    className='mb-5 font-medium hover:text-forestgreen transition-all'
                    key={info.label}
                    href={info.url}
                  >
                    {info.label}
                  </Link>
                ))}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
