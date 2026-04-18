type InputVariant = "primary" | "secondary" | "readonly";

type FormInputProps = {
  label: string;
  type?: "text" | "email" | "password";
  name?: string;
  variant: InputVariant;
  placeholder?: string;
  value: string;
  autoComplete?: string;
  readonly?: boolean;
  onChange: (value: string) => void;
};

const VARIANT_CLASSES: Record<InputVariant, string> = {
  primary:
    "text-brown-400 border-brown-300 focus:border-brown-600 focus:text-brown-500",
  secondary:
    "text-brand-red border-brand-red focus:border-brand-red focus:text-brand-red",
  readonly: "text-brown-400 border-brown-200",
};

export function FormInput({
  label,
  type = "text",
  name,
  placeholder,
  value,
  autoComplete,
  variant,
  readonly = false,
  onChange,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-[4px]">
      <label className="text-body-1 text-brown-400">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        readOnly={readonly}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          px-[16px] py-[12px]
          ${readonly ? "bg-brown-200" : "bg-white"}
          border-1
          ${VARIANT_CLASSES[variant]}
          rounded-[8px]
          text-body-1
          outline-none
          focus:ring-0
        `}
      />
    </div>
  );
}
