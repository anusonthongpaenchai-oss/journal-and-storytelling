import { Github } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Mail } from "lucide-react";

function DesktopFooter() {
  return (
    <div
      className="
              hidden
              md:flex flex-row justify-between
              px-[120px] py-[60px]
              bg-brown-200"
    >
      {/* Cornor Left */}
      <div
        className="
      flex flex-row
      gap-[24px]"
      >
        {/* Text */}
        <h3 className="text-body-1 text-brown-500">Get in touch</h3>

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

      {/* Cornor Right */}
      <button type="button" className="text-body-1 text-brown-600 underline">
        Home page
      </button>
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
        <h3 className="text-body-1 text-brown-500">Get in touch</h3>

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
      <button type="button" 
        className="text-body-1 text-brown-600 underline"
      >
        Home page
      </button>
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
