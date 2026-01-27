type CommentItemProps = {
    avatar: string;
    author: string;
    date: string;
    content: string;
  };
  
  export function CommentItem({
    avatar,
    author,
    date,
    content,
  }: CommentItemProps) {
    return (
      <article
        className="
          flex flex-col
          gap-[16px]
        "
      >
        {/* Header */}
        <header
          className="
            flex
            items-center
            gap-[12px]
          "
        >
          <img
            src={avatar}
            alt={author}
            className="
              w-[44px] h-[44px]
              rounded-full
              object-cover
            "
          />
  
          <div
            className="
              flex flex-col
            "
          >
            <span className="text-headline-4 text-brown-500">
              {author}
            </span>
            <span className="text-body-3 text-brown-400">
              {date}
            </span>
          </div>
        </header>
  
        {/* Content */}
        <p
          className="
            text-body-1
            text-brown-400
            whitespace-pre-line
          "
        >
          {content}
        </p>
      </article>
    );
  }
  