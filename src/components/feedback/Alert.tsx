import { useEffect } from "react";
import { X } from "lucide-react";

type AlertVariant = "primary" | "secondary";

type AlertProps = {
    title: string;
    description: string;
    variant?: AlertVariant;
    onClose: () => void;
};

const VARIANT_STYLES: Record<AlertVariant, string> = {
    primary: "bg-brand-green text-white",
    secondary: "bg-brand-red text-white",
};

export function Alert({
    title,
    description,
    variant = "primary",
    onClose,
}: AlertProps) {
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [onClose]);

    return (
        <div
            className={`
                flex
                gap-[12px]
                p-[16px]
                w-full
                ${VARIANT_STYLES[variant]}
                rounded-[8px]
                shadow-[20px]
            `}
        >
            <div className="flex flex-col gap-[4px]">
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
                <X />
            </button>
        </div>
    );
}
