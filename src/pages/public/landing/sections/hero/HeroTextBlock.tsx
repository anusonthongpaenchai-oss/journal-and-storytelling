type HeroTextBlockProps = {
    variant: "desktop" | "mobile";
  };
  
  export function HeroTextBlock({ variant }: HeroTextBlockProps) {
    const isDesktop = variant === "desktop";
  
    return (
      <header
        className={`
          flex flex-col
          ${isDesktop ? "w-[347px] h-[276px]" : "w-[343px]"}
          gap-[${isDesktop ? "24px" : "16px"}]
          text-brown-600
        `}
      >
        {/* Hero Headline */}
        {/* - Responsive headline layout based on variant */}
        <h1
          className={`
            flex flex-col
            ${isDesktop ? "items-end text-headline-1" : "items-center text-headline-2"}
          `}
        >
          {isDesktop && <span>Stay</span>}
          <span>{isDesktop ? "Informed," : "Stay Informed,"}</span>
          <span>Stay Inspired</span>
        </h1>
  
        {/* Hero Description */}
        {/* - Supporting text aligned with headline */}
        <p
          className={`
            flex flex-col
            ${isDesktop ? "items-end" : "items-center"}
            text-body-1
            text-brown-400
          `}
        >
          <span>Discover a World of Knowledge at Your</span>
          <span>Fingertips. Your Daily Dose of Inspiration</span>
          <span>and Information.</span>
        </p>
      </header>
    );
  }
  