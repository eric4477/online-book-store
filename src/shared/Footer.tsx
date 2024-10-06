import footerLogo from "../assets/images/footer-logo.svg";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer id="about-us" className="bg-[#ED553B] py-16 px-10 md:px-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        <div className="col-span-1 flex flex-col">
          <img className="w-[82px]" src={footerLogo} alt="logo" />
          <p className="text-white mt-2 w-[80%] lg:max-w-[70%]">
            Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <div className="flex flex-row flex-wrap justify-start gap-4 sm:gap-6 lg:gap-12 mt-9">
            <a href="#">
              <FaFacebook size={44} color="white" />
            </a>
            <a href="#">
              <FaLinkedin size={44} color="white" />
            </a>
            <a href="#">
              <FaTwitter size={44} color="white" />
            </a>
            <a href="#">
              <FaYoutube size={44} color="white" />
            </a>
          </div>
        </div>
        <div className="col-span-1 flex flex-col">
          <h3 className="uppercase text-2xl font-semibold tracking-wide text-white w-fit">
            Company
          </h3>
          <div className="links flex flex-col gap-3 mt-6">
            <a
              className="uppercase text-lg font-semibold text-white hover:text-[#393280] w-fit"
              href="#"
            >
              home
            </a>
            <a
              className="uppercase text-lg font-semibold text-white hover:text-[#393280] w-fit"
              href="#about-us"
            >
              about us
            </a>
            <a
              className="uppercase text-lg font-semibold text-white hover:text-[#393280] w-fit"
              href="#books"
            >
              books
            </a>
            <a
              className="uppercase text-lg font-semibold text-white hover:text-[#393280] w-fit"
              href="#new-release"
            >
              new release
            </a>
            <a
              className="uppercase text-lg font-semibold text-white hover:text-[#393280] w-fit"
              href="#contact-us"
            >
              contact us
            </a>
            <a
              className="uppercase text-lg font-semibold text-white hover:text-[#393280] w-fit"
              href="#blog"
            >
              blog
            </a>
          </div>
        </div>
        <div className="col-span-1 flex flex-col">
          <h3 className="uppercase text-2xl font-semibold tracking-wide text-white">
            Important Links
          </h3>
          <div className="links flex flex-col gap-3 mt-6">
            <a
              className="text-lg font-semibold text-white hover:text-[#393280] w-fit"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-lg font-semibold text-white hover:text-[#393280] w-fit"
              href="#"
            >
              FAQs
            </a>
            <a
              className="text-lg font-semibold text-white hover:text-[#393280] w-fit"
              href="#"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-3 flex-wrap justify-between mt-8">
        <p className="text-lg text-white">
          &copy; {new Date().getFullYear()} Airhant. All Rights Reserved.
        </p>
        <p className="text-lg text-white">
          <a href="#">Privacy | Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
