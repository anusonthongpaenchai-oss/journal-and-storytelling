type TextAreaFieldProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
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
        className="
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
            border border-brown-300
            rounded-[8px]
            focus:outline-none
            focus:border-brown-500
          "
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
