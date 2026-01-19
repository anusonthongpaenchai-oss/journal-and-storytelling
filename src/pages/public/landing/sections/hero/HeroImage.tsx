type HeroImageProps = {
    width: string;
    height: string;
  };
  
  export function HeroImage({ width, height }: HeroImageProps) {
    return (
      <div
        className={`
          relative
          ${width}
          ${height}
          rounded-2xl
          overflow-hidden
        `}
      >
        {/* Hero Image */}
        {/* - Main visual element of hero section */}
        {/* - Size is controlled via width / height props */}
  
        <img
          src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
          alt="man-and-cat-forest"
          className="
            w-full h-full
            object-cover
          "
        />
  
        {/* Color Overlay */}
        {/* - Semi-transparent overlay for visual tone */}
        <div className="absolute inset-0 bg-[rgba(190,187,177,0.25)]" />
      </div>
    );
  }
  