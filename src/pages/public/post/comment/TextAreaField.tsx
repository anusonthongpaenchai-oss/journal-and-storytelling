type TextAreaFieldProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  isInvalid?: boolean;
};

export function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  isInvalid = false,
}: TextAreaFieldProps) {
  return (
    <div
      className="
          flex flex-col
          gap-[8px]
        "
    >
      <label className="text-body-2 text-brown-500">
        {label}
      </label>

      <textarea
        rows={4}
        className={`
            h-[102px]
            flex
            gap-[10px]
            pt-[12px]
            pr-[4px]
            pb-[4px]
            pl-[16px]
            text-body-1
            text-brown-600
            placeholder:text-brown-400
            border
            rounded-[8px]
            focus:outline-none
            ${isInvalid ? "border-brand-red focus:border-brand-red" : "border-brown-300 focus:border-brown-500"}
          `}
        style={{
          borderColor: isInvalid ? "border-brand-red" : undefined,
        }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
