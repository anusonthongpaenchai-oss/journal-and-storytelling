import { CheckIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

import PublicNavbar from "@/components/layout/PublicNavbar";
import { Button } from "@/components/ui/Button";

function AdminSignupSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      <PublicNavbar />

      <div
        className="
          mt-[60px] flex w-[798px] flex-col items-center gap-[40px]
          rounded-[16px] bg-brown-200 px-[120px] py-[60px]
        "
      >
        <div
          className="
            flex items-center justify-center rounded-full bg-brand-green p-[16px]
          "
        >
          <CheckIcon className="text-[48px] text-white" />
        </div>

        <h2 className="text-center text-headline-2">
          Admin Registration Success
        </h2>

        <Button
          label="Continue"
          variant="primary"
          width="w-[158px]"
          onClick={() => navigate("/admin/login")}
        />
      </div>
    </div>
  );
}

export default AdminSignupSuccessPage;
