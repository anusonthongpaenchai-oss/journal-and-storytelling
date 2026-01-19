import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

type AuthGateModalProps = {
  to: string;
  onClose: () => void;
};

export function AuthGateModal({ to, onClose }: AuthGateModalProps) {
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40
      "
      onClick={onClose}
    >
      <section
        className="
          flex flex-col
          gap-[24px]
          w-[343px] md:w-[621px]
          pt-[16px]
          px-[16px] md:px-[24px]
          pb-[40px]
          bg-brown-100
          rounded-[16px]
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="text-brown-400" />
          </button>
        </div>

        {/* Content */}
        <div
          className="
            flex flex-col
            items-center
            text-center
            gap-[16px] 
            md:gap-[40px]
          "
        >
          <h2
            className="
              text-headline-3 lg:text-headline-2
              text-brown-600
            "
          >
            Create an account to continue
          </h2>

          <Button
            label="Create account"
            variant="primary"
            width="w-[207px]"
          />

          <p className="flex gap-[12px] text-body-1 text-brown-400">
            <span>Already have an account?</span>
            <Link
              to={to}
              className="underline text-brown-600"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
