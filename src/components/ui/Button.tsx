import type { ReactNode } from "react";

type ButtonType = "button" | "submit" | "reset";

type ButtonProps = {
  label: ReactNode;
  variant: "primary" | "secondary";
  type?: ButtonType;
  icon?: ReactNode;
  width?: string;
  form?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  label,
  icon,
  variant,
  width = 'w-full',
  type = "button",
  form,
  disabled,
  onClick,
}: ButtonProps) {
  const baseClassName = `
    ${width}
    h-[48px]
    text-body-1
    rounded-[999px]
    hover:cursor-pointer
    px-[40px] py-[12px]
    flex
    items-center justify-center
    whitespace-nowrap
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

  const disabledClassName = `
      opacity-50
      cursor-not-allowed
      pointer-events-none
    `;

  return (
    <button
      form={form}
      type={type}
      onClick={onClick}
      className={`${baseClassName} ${variantClassName} ${disabled && disabledClassName}`}
      disabled={disabled}
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
