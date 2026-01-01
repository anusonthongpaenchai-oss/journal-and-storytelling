interface BlogCardProps {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  date: string;
  likes: number;
}

export function BlogCardDesktop({
  id,
  image,
  category,
  title,
  description,
  author,
  authorAvatar,
  date,
  likes,
}: BlogCardProps) {
  return (
    <article
      className="
        flex flex-col
        gap-[24px]
        h-[582px]
      "
    >
      {/* Cover Image */}
      {/* - Clickable thumbnail linking to article detail */}
      <a
        href={`/article/${id}`}
        className="
          relative
          h-[360px]
        "
      >
        <img
          src={image}
          alt={title}
          className="
            w-full h-full
            object-cover
            rounded-[12px]
          "
        />
      </a>

      {/* Content */}
      {/* - Article information and metadata */}
      <div
        className="
          flex flex-col
          gap-[12px]
        "
      >
        {/* Category */}
        <div className="flex">
          <span
            className="
              px-[12px] py-[4px]
              bg-brand-green-soft
              text-body-2 text-brand-green
              rounded-full
            "
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <a href={`/article/${id}`}>
          <h2
            className="
              text-headline-4
              text-brown-600
              line-clamp-2
              hover:underline
            "
          >
            {title}
          </h2>
        </a>

        {/* Description */}
        <p
          className="
            text-body-2
            text-brown-400
            line-clamp-2
          "
        >
          {description}
        </p>

        {/* Meta */}
        {/* - Author info on the left, likes on the right */}
        <div
          className="
            flex
            items-center justify-between
            text-body-2
          "
        >
          {/* Author */}
          <div
            className="
              flex flex-row
              items-center
              gap-[16px]
            "
          >
            <img
              src={authorAvatar}
              alt={author}
              className="
                w-[24px] h-[24px]
                object-cover
                rounded-[99px]
              "
            />
            <span className="text-body-2 text-brown-500">{author}</span>
            <span className="text-brown-300">|</span>
            <span className="text-body-2 text-brown-400">{date}</span>
          </div>

          {/* Likes */}
          <div className="text-body-2 text-brown-400">
            <span>❤️ {likes}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogCardMobile({
  id,
  image,
  category,
  title,
  description,
  author,
  authorAvatar,
  date,
  likes,
}: BlogCardProps) {
  return (
    <article
      className="
        flex flex-col
        gap-[16px]
      "
    >
      {/* Cover Image */}
      <a
        href={`/article/${id}`}
        className="
          relative
          h-[212px]
        "
      >
        <img
          src={image}
          alt={title}
          className="
            w-full h-full
            object-cover
            rounded-[12px]
          "
        />
      </a>

      {/* Content */}
      <div
        className="
          flex flex-col
          gap-[12px]
        "
      >
        {/* Category */}
        <div className="flex">
          <span
            className="
              px-[12px] py-[4px]
              bg-brand-green-soft
              text-body-2 text-brand-green
              rounded-full
            "
          >
            {category}
          </span>
        </div>

        {/* Title */}
        <a href={`/article/${id}`}>
          <h2
            className="
              text-headline-4
              text-brown-600
              line-clamp-2
              hover:underline
            "
          >
            {title}
          </h2>
        </a>

        {/* Description */}
        <p
          className="
            text-body-2
            text-brown-400
            line-clamp-2
          "
        >
          {description}
        </p>

        {/* Meta */}
        <div
          className="
            flex
            items-center justify-between
            text-body-2
          "
        >
          {/* Author */}
          <div
            className="
              flex flex-row
              items-center
              gap-[16px]
            "
          >
            <img
              src={authorAvatar}
              alt={author}
              className="
                w-[24px] h-[24px]
                object-cover
                rounded-[99px]
              "
            />
            <span className="text-body-2 text-brown-500">{author}</span>
            <span className="text-brown-300">|</span>
            <span className="text-body-2 text-brown-400">{date}</span>
          </div>

          {/* Likes */}
          <div className="text-body-2 text-brown-400">
            <span>❤️ {likes}</span>
          </div>
        </div>
      </div>
    </article>
  );
}