import Link from "next/link";
import LinksSection from "./links-section";
import { LinkData, LinksContact, LinksList, LinksSocialMedia } from "./types";

interface Props {
  logo?: { url: string };
  links?: LinksList[];
  contact?: LinksContact;
  social?: LinksSocialMedia;
  createdBy?: string;
  privacyPolicy?: LinkData;
  copyright?: string;
}

export default function Footer({
  logo,
  links,
  contact,
  social,
  createdBy,
  privacyPolicy,
  copyright,
}: Props) {
  return (
    <section className="bg-white w-full flex text-[14px] md:text-[15px] lg:text-[16px] font-normal text-black justify-center">
      <LinksSection
        logo={logo}
        links={links}
        contact={contact}
        social={social}
      />
      <div>
        {copyright && <p>{copyright}</p>}
        {privacyPolicy && (
          <Link href={privacyPolicy?.label}>{privacyPolicy?.label}</Link>
        )}
        {createdBy && <p>{createdBy}</p>}
      </div>
    </section>
  );
}
