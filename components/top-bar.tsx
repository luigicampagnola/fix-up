// components/TopBar.tsx
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const TopBar = () => {
  return (
    <div className="bg-gray-800 text-white text-sm py-2 px-4 flex justify-between items-center">
      {/* Contact Information */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <FaPhone />
          <span>(123) 456-7890</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaEnvelope />
          <span>contacto@example.com</span>
        </div>
        <div className="flex items-center space-x-1">
          <FaMapMarkerAlt />
          <span>123 Calle Principal, Ciudad, País</span>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex items-center space-x-3">
        <a href="https://facebook.com" aria-label="Facebook">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" aria-label="Twitter">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" aria-label="Instagram">
          <FaInstagram />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
