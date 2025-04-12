import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-white to-green-100 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section */}
        <div>
          <h2 className="text-lg font-bold text-green-600 flex items-center">
            <span className="mr-2">💚</span> WasteNot Connect
          </h2>
          <p className="mt-2 text-sm">
            Connecting surplus food with those in need, creating a sustainable solution to reduce waste and fight hunger.
          </p>
          <div className="flex space-x-4 mt-4 text-gray-500">
            <a href="#" className="hover:text-green-600 cursor-pointer text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-600 cursor-pointer text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-green-600 cursor-pointer text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-green-600 cursor-pointer text-xl">
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Platform Section */}
        <div>
          <h3 className="font-bold">PLATFORM</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link to="/update" className="hover:text-green-600">Update Food</Link></li>
            <li><Link to="/volunteer" className="hover:text-green-600">Volunteer</Link></li>
            <li><Link to="/dashboard" className="hover:text-green-600">Dashboard</Link></li>
            <li><Link to="/impact" className="hover:text-green-600">Our Impact</Link></li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="font-bold">RESOURCES</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-green-600">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-green-600">Blog</Link></li>
            <li><Link to="/faq" className="hover:text-green-600">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-green-600">Contact</Link></li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="font-bold">LEGAL</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-green-600">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-green-600">Terms of Service</Link></li>
            <li><Link to="/cookies" className="hover:text-green-600">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10">
        © 2025 WasteNot Connect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
