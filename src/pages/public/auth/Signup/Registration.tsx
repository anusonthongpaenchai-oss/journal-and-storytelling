import { CheckIcon } from "@chakra-ui/icons";

import { Button } from "@/components/ui/Button";
import { useBackNavigation } from "@/hooks/useBackNavigation";

function Registration() {
  const { goBack } = useBackNavigation();

  return (
    <div
      className="
        flex flex-col items-center
        gap-[40px]
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
        onClick={goBack}
      />
    </div>
  );
}

export default Registration;
