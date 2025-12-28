import hirker from '@/assets/landing/hero-section/hiker.jpg'

function DesktopHeroHighlight() {
  return (
    <div
      className="
            hidden
            md:flex flex-row
            gap-[60px]
            justify-between
            items-center
            w-auto"
    >
      {/* Left Text */}
      <div
        className="
            flex flex-col
            gap-[24px]
            w-[347px]
            text-brown-600
            "
      >
        <h1
          className="
                flex flex-col
                items-end
                text-headline-1
                "
        >
          <span>Stay </span>
          <span>Informed,</span>
          <span>Stay Inspired </span>
        </h1>

        <p
          className="
                flex flex-col
                items-end
                text-body-1 
                text-brown-400
                "
        >
          <span>Discover a World of Knowledge at Your</span>
          <span>Fingertips. Your Daily Dose of Inspiration</span>
          <span>and Information.</span>
        </p>
      </div>

      {/* Image center */}
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src={hirker}
          alt="man-and-cat-forest"
          style={{ width: "386px", height: "529px", objectFit: "cover"}}
        />
        <div className="absolute inset-0 bg-[rgba(190,187,177,0.25)]" />
      </div>

      {/* Right Text */}
      <div
        className="
            flex flex-col
            gap-[24px]
            w-[347px]
            text-brown-600
            "
      >
        <p className="flex flex-col">
          <span className="text-body-3 text-brown-400"> -Author </span>
          <span className="text-headline-3 text-14-500"> Thompson P.</span>
        </p>

        <p className="text-body-1 text-brown-400">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness. <br />
          <br />
          When i’m not writing, I spends time volunteering at my local animal
          shelter, helping cats find loving homes.
        </p>
      </div>
    </div>
  );
}

function MobileHeroHighlight() {
  return (
    <div
      className="
        md:hidden
        flex flex-col
        items-center
        gap-[40px] py-[40px] px-[16px]"
    >
      {/* Top Text */}
      <div
        className="
            flex flex-col
            justify-center
            gap-[16px]
            w-auto
            text-brown-600
            "
      >
        <h1
          className="
                flex flex-col
                items-center
                text-headline-2
                "
        >
          <span>Stay Informed,</span>
          <span>Stay Inspired </span>
        </h1>
        <p
          className="
                flex flex-col
                items-center
                text-body-1
                text-brown-400
                "
        >
          <span>Discover a World of Knowledge at Your</span>
          <span>Fingertips. Your Daily Dose of Inspiration</span>
          <span>and Information.</span>
        </p>
      </div>

      {/* Image center */}
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src={hirker}
          alt="man-and-cat-forest"
          style={{ width: "343px", height: "470px", objectFit: "cover"}}
        />
        <div className="absolute inset-0 bg-[rgba(190,187,177,0.25)]" />
      </div>

      {/* Bottom Text */}
      <div
        className="
            flex flex-col
            gap-[12px]
            text-brown-600
            "
      >
        <p className="flex flex-col">
          <span className="text-body-3 text-brown-400"> -Author </span>
          <span className="text-headline-3 text-14-500"> Thompson P.</span>
        </p>

        <p className="text-body-1 text-brown-400">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
          <br />
          <br />
          When i’m not writing, I spends time volunteering at my local animal
          shelter, helping cats find loving homes.
        </p>
      </div>
    </div>
  );
}

function HeroHighlight() {
  return (
    <>
      <DesktopHeroHighlight />
      <MobileHeroHighlight />
    </>
  );
}

export default HeroHighlight;
