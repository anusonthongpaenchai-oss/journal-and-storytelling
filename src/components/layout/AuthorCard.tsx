type AuthorCardProps = {
  avatar: string;
  name: string;
  bio: string;
  width?: string;
};

export function AuthorCard({
  avatar,
  name,
  bio,
  width = 'w-[305px]',
}: AuthorCardProps) {
  return (
    <section
      className={`
        flex flex-col 
        gap-[20px]
        p-[24px]
        bg-brown-200
        border border-brown-200
        rounded-[16px]
        ${width}
        `}
      
    >
      {/* Header */}
      <header className="flex items-center gap-[12px]">
        <img
          src={avatar}
          alt={name}
          className="w-[44px] h-[44px] rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-body-3 text-brown-400">Author</span>
          <span className="text-headline-4 text-brown-500">{name}</span>
        </div>
      </header>

      <div className="border border-brown-300" />

      {/* Bio (Markdown) */}
      <p className="text-body-1 text-brown-400 whitespace-pre-line">
        {bio}
      </p>
    </section>
  );
}
