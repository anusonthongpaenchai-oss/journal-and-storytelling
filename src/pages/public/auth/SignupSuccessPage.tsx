import { CheckIcon } from "@chakra-ui/icons";
import { Button } from "@/components/ui/Button";
import PublicNavbar from "@/components/layout/PublicNavbar";
import { useNavigate } from "react-router-dom";

function SignupSuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <PublicNavbar />
      <div
        className="
        flex flex-col items-center
        gap-[40px]
        mt-[40px] md:mt-[60px]
        w-[343px] md:w-[798px]
        px-[24px] py-[40px]
        md:px-[120px] md:py-[60px]
        bg-brown-200
        rounded-[16px]
      "
      >
        <div
          className="
          flex items-center justify-center
          p-[16px]
          bg-brand-green
          rounded-full
        "
        >
          <CheckIcon className="text-[48px] text-white" />
        </div>

        <h2 className="text-headline-3 md:text-headline-2">
          Registration Success
        </h2>

        <Button
          label="Continue"
          variant="primary"
          width="w-[158px]"
          onClick={() => navigate("/login")}
        />
      </div>
    </div>
  );
}

export default SignupSuccessPage;
