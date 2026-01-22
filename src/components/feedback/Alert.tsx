type ToastVariant = "primary" | "secondary";
import { X } from "lucide-react";

type AlertProps = {
    title: string;
    description: string;
    variant?: ToastVariant;
    onClose: () => void;
};

const VARIANT_STYLES: Record<ToastVariant, string> = {
    primary: "bg-brand-green text-white",
    secondary: "bg-brand-red text-white",
};

export function Alert({
    title,
    description,
    variant = "primary",
    onClose,
}: AlertProps) {
    return (
        <div
            className={`
        flex
        gap-[12px]
        p-[16px]
        w-full
        ${VARIANT_STYLES[variant]}
        rounded-[8px] shadow-[20px]
      `}
        >
            <div
                className="
          flex
          flex-col
          gap-[4px]
        "
            >
                <span className="text-headline-4">
                    {title}
                </span>
                <span className="text-body-2">
                    {description}
                </span>
            </div>

            <button
                type="button"
                onClick={onClose}
                className="
          flex
          items-center justify-center
          w-6 h-6
          text-white/80
          hover:text-white
        "
                aria-label="Close notification"
            >
                < X />
            </button>
        </div>
    );
}
