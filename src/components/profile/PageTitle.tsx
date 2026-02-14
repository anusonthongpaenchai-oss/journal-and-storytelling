type PageTitleProps = {
  avatarUrl: string;
  alt: string;
  name: string;
  title: string;
};

function PageTitle({ avatarUrl, alt, name, title }: PageTitleProps) {
  return (
    <div className="flex items-center gap-[16px] md:w-[794px]">
      <img
        src={avatarUrl}
        alt={`${alt} picture`}
        className="
          w-[40px] h-[40px]
          rounded-full
          md:w-[60px] md:h-[60px]
        "
      />

      <div className="flex items-center gap-[16px] text-headline-3">
        <span className="text-brown-400">
          {name}
        </span>

        <span className="text-brown-300">|</span>

        <span className="text-brown-600">{title}</span>
      </div>
    </div>
  );
}

export default PageTitle;
