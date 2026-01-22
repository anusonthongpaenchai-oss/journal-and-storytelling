import type { ReactNode } from "react";

type ButtonType = "button" | "submit" | "reset";

type ButtonProps = {
  label: ReactNode;
  variant: "primary" | "secondary";
  type?: ButtonType;
  icon?: ReactNode;
  width?: string;
  form?: string;
  onClick?: () => void;
};

export function Button({
  label,
  icon,
  variant,
  width = 'w-full',
  type = "button",
  form,
  onClick,
}: ButtonProps) {
  const baseClassName = `
    ${width}
    h-[48px]
    text-body-1
    rounded-[999px]
    hover:cursor-pointer
    flex
    items-center justify-center
  `;

  const variantClassName =
    variant === "primary"
      ? `
        bg-brown-600 text-white
        hover:bg-brown-400
        active:bg-brown-500
      `
      : `
        bg-white
        border border-brown-400
        hover:text-brown-400
        active:text-brown-500
      `;

  return (
    <button
      form={form}
      type={type}
      onClick={onClick}
      className={`${baseClassName} ${variantClassName}`}
    >
      <span className="flex items-center gap-[6px]">
        <span className="flex items-center gap-[6px] leading-none">
          {icon && <span className="flex items-center">{icon}</span>}
          <span>{label}</span>
        </span>
      </span>
    </button>
  );
}
