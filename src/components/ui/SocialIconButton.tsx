import type { ReactNode } from "react";

type SocialIconButtonProps = {
  icon: ReactNode;
  href: string;
};

export function SocialIconButton({
  icon,
  href,
}: SocialIconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="flex items-center justify-cente">
        {icon}
      </span>
    </a>
  );
}
