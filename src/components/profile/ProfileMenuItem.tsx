type ProfileMenuItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

export function ProfileMenuItem({
  icon,
  label,
  onClick,
}: ProfileMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex items-center gap-[12px]
        px-[16px] py-[12px]
        w-full
        text-body-1 text-brown-500
        hover:bg-brown-200
      "
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
