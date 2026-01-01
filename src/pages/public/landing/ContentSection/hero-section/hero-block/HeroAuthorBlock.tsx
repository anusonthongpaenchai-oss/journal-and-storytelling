export function HeroAuthorBlock() {
    return (
      <footer
        className="
          flex flex-col
          gap-[24px]
          w-[347px]
          text-brown-600
        "
      >
        {/* Hero Author */}
        {/* - Displays author name and short biography in hero section */}
  
        {/* Author Name */}
        <p className="flex flex-col">
          <span className="text-body-3 text-brown-400">- Author</span>
          <span className="text-headline-3 text-14-500">Thompson P.</span>
        </p>
  
        {/* Author Description */}
        <p className="text-body-1 text-brown-400">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
          <br />
          <br />
          When i’m not writing, I spends time volunteering at my local animal
          shelter, helping cats find loving homes.
        </p>
      </footer>
    );
  }
  