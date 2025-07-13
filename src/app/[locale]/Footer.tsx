import { FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Left: Logo, tagline, social */}
        <div className="flex-1 flex flex-col items-start">
          <span className="font-pacifico text-5xl text-black mb-2">integrAI</span>
          <span className="text-2xl font-semibold text-gray-800 mb-8">Here to help deals find you!</span>
          <div className="flex gap-4 mb-8">
            <a 
              href={`https://wa.me/${'525663879864'}?text=${encodeURIComponent('¡Hola! Estoy interesado en conocer más sobre las soluciones de AI de IntegrAI.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366] hover:bg-[#1ea952] transition text-2xl text-white"
              title="Contact us on WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-2xl text-gray-700">
              <FiFacebook />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-2xl text-gray-700">
              <FiTwitter />
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-2xl text-gray-700">
              <FiInstagram />
            </a>
          </div>
        </div>
        {/* Center: Company */}
        <div className="flex-1 flex flex-col items-start md:items-center">
          <span className="font-bold text-2xl text-black mb-4">Company</span>
          <a href="#" className="text-lg text-gray-800 mb-2 hover:underline">Ambassador Program</a>
          <a href="#" className="text-lg text-gray-800 mb-2 hover:underline">Request Merchant</a>
          <a href="#" className="text-lg text-gray-800 mb-2 hover:underline">For Merchants</a>
        </div>
        {/* Right: Support */}
        <div className="flex-1 flex flex-col items-start md:items-center">
          <span className="font-bold text-2xl text-black mb-4">Support</span>
          <a href="#" className="text-lg text-gray-800 mb-2 hover:underline">Contact Us</a>
          <a href="#" className="text-lg text-gray-800 mb-2 hover:underline">Partner With Us</a>
          <a href="#" className="text-lg text-gray-800 mb-2 hover:underline">Policies</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 border-t border-gray-200 pt-6 text-center">
        <span className="text-gray-500 text-sm">©2023 QuillPayments Inc. ©2023 All Rights Reserved.</span>
      </div>
    </footer>
  );
} 