import { BsFillTelephoneFill } from "react-icons/bs";
import SocialHamburgerMenu from "./SocialHamburgerMenu";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import CustomIcon from "../assets/images/customIcon.svg";

function SocialNavbar() {
  return (
    <nav
      className="social-navbar py-3 px-10 flex items-center justify-between bg-[#393280] text-white
     max-sm:px-5"
    >
      <div className="contact-phone flex items-center gap-1">
        <BsFillTelephoneFill className="transform rotate-12" />
        <span className="text-lg">+91 8374902234</span>
      </div>
      <div className="social-links flex items-center gap-6 max-sm:hidden">
        <a href="#">
          <FaFacebookF className="text-[20px]" />
        </a>
        <a href="#">
          <FaInstagram className="text-[20px]" />
        </a>
        <a href="#">
          <FaLinkedinIn className="text-[20px]" />
        </a>
        <a href="#">
          <FaTwitter className="text-[20px]" />
        </a>
        <a href="#">
          <img src={CustomIcon} alt="custom icon" />
        </a>
      </div>
      <SocialHamburgerMenu />
    </nav>
  );
}

export default SocialNavbar;
