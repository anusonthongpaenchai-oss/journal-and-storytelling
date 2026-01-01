import { useState } from "react";
import { Button, CircularProgress } from "@chakra-ui/react";

interface SectionLinkProps {
  label?: string;
  href?: string;
  delay?: number;
  spinnerColor?: string;
  onClick?: () => Promise<void> | void;
}

export function SectionLinkButton({
  label = "Button",
  href = "#",
  delay = 1000,
  spinnerColor = "gray.300",
  onClick,
}: SectionLinkProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);

    try {
      if (onClick) {
        await onClick();
      } else {
        // fallback mock behavior
        await new Promise((resolve) => setTimeout(resolve, delay));
        window.location.href = href;
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section
      className="
        flex
        items-center justify-center
        h-[40px]
      "
    >
      <Button
        type="button"
        variant="unstyled"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress
            isIndeterminate
            size="24px"
            color={spinnerColor}
          />
        ) : (
          <span
            className="
              text-body-1
              text-brown-600
              underline
              hover:text-brown-400
            "
          >
            {label}
          </span>
        )}
      </Button>
    </section>
  );
}
