type InputVariant = "primary" | "secondary";

type FormInputProps = {
  label: string;
  type?: "text" | "email" | "password";
  variant: InputVariant;
  placeholder?: string;
  value: string;
  autoComplete?: string;
  onChange: (value: string) => void;
};

const VARIANT_CLASSES: Record<InputVariant, string> = {
  primary: "text-brown-400 border-brown-300 focus:border-brown-600 focus:text-brown-500",
  secondary: "text-brand-red border-brand-red focus:border-brand-red focus:text-brand-red",
};


export function  FormInput({
  label,
  type = "text",
  placeholder,
  value,
  autoComplete,
  variant,
  onChange,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-body-1 text-brown-400">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full
          py-3 pl-4 pr-3
          bg-white
          border-1
          ${VARIANT_CLASSES[variant]}
          rounded-lg
          outline-none
          focus:ring-0
          text-body-1
        `}
      />
    </div>
  );
}

