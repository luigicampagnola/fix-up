import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
} from "react-icons/fa";
import { Email, PhoneNumber, Facebook } from "../components/types"; // Importa los tipos de `types.ts`

interface TopBarProps {
  phoneNumber: PhoneNumber;
  email: Email;
  address: string;
  facebook: Facebook;
}

export const TopBar = ({
  phoneNumber,
  email,
  address,
  facebook,
}: TopBarProps) => {
  return (
    <div className="bg-midnightblue text-white text-sm py-2 px-4 flex justify-between items-center">
      {/* Contact Information */}
      <div className="flex items-center space-x-4">
        {phoneNumber && (
          <div className="flex items-center space-x-1">
            <FaPhone />
            <a href={phoneNumber.href} aria-label="Phone Number">
              <span>{phoneNumber.label}</span>
            </a>
          </div>
        )}
        {email && (
          <div className="flex items-center space-x-1">
            <FaEnvelope />
            <a
              href={email.emailHref}
              aria-label="Email Address"
              target={email.target}
            >
              <span>{email.label}</span>
            </a>
          </div>
        )}
        {address && (
          <div className="flex items-center space-x-1">
            <FaMapMarkerAlt />
            <span>{address}</span>
          </div>
        )}
      </div>

      {/* Social Icons */}
      <div className="flex items-center space-x-3">
        {facebook && (
          <div className="flex items-center space-x-1">
            <a
              href={facebook.href}
              aria-label="Facebook"
              target={facebook.target}
            >
              <FaFacebook />
            </a>
            {facebook.label && <span>{facebook.label}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
