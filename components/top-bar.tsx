import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook} from 'react-icons/fa';
import { Email, PhoneNumber, Facebook } from "../components/types";  // Importa los tipos de `types.ts`


interface TopBarProps {
  phoneNumber?: PhoneNumber;
  email?: Email;
  address?: string;
  facebook?: Facebook;
  instagramHref?: string;
  googleHref?: string;
}

export const TopBar = ({ phoneNumber, email, address, facebook }: TopBarProps) => {

  return (
    <div className="bg-midnightblue text-white text-sm py-2 px-4 flex justify-between items-center">
      {/* Contact Information */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <FaPhone />
          <span>{phoneNumber?.label}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaEnvelope />
          <span>{email?.label}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaMapMarkerAlt />
          <span>{address}</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <a href="https://facebook.com" aria-label="Facebook">
          <FaFacebook />
        </a>
        <span>{facebook?.label}</span>
      </div>
    </div>
  );
};

export default TopBar;



