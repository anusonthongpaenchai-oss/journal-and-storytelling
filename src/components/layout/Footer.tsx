import { Github, Linkedin, Mail } from "lucide-react";
import { SectionLinkButton } from "../ui/SectionLink";

function DesktopFooter() {
  return (
    <div
      className="
              hidden
              md:flex flex-row justify-between items-center
              px-[120px] py-[60px]
              bg-brown-200"
    >
      {/* Cornor Left */}
      <div
        className="
      flex flex-row items-center
      gap-[24px] h-[24px]
      "
      >
        {/* Text */}
        <div className="flex flex-row justify-center items-center">
          <span className="text-body-1 text-brown-500">Get in touch</span>
        </div>

        {/* Icon */}
        <div className="flex flex-row gap-[16px] ">
          <a href="#">
            <Linkedin />
          </a>

          <a href="#">
            <Github />
          </a>

          <a href="#">
            <Mail />
          </a>
        </div>
      </div>

      {/* Cornor Right */}
      <SectionLinkButton label="Home page" href="#" />
    </div>
  );
}

function MobileFooter() {
  return (
    <div
      className="
        md:hidden 
        flex flex-col items-center
        gap-[24px]
        px-[16px] py-[40px]
        bg-brown-200"
    >
      <div
        className="
          flex flex-row 
          gap-[24px]"
      >
        {/* Text */}
        <div className="flex flex-row justify-center items-center">
          <span className="text-body-1 text-brown-500">Get in touch</span>
        </div>

        {/* Icon */}
        <div className="flex gap-[16px]">
          <button type="button">
            <Linkedin />
          </button>

          <button type="button">
            <Github />
          </button>

          <button type="button">
            <Mail />
          </button>
        </div>
      </div>

      {/* Text bottom */}
      <SectionLinkButton label="Home page" href="#" />
    </div>
  );
}

function Footer() {
  return (
    <>
      <DesktopFooter />
      <MobileFooter />
    </>
  );
}

export default Footer;
