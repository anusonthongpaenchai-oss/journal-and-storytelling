type NotificationItem = {
  id: string;
  avatarUrl: string;
  title: string;
  message: string;
  timeAgo: string;
};

type NotificationListProps = {
  items: NotificationItem[];
  onItemClick?: (id: string) => void;
};

export function NotificationList({
  items,
  onItemClick,
}: NotificationListProps) {
  if (items.length === 0) {
    return (
      <div
        className="
          flex flex-col
          w-[362px]
          gap-[16px]
          px-[16px] py-[20px]
          bg-brown-100
          rounded-[12px]
          shadow-lg
          overflow-hidden
        "
      >
        <span className="text-body-2 text-brown-400">No notifications yet.</span>
      </div>
    );
  }

  return (
    <div
      className="
        flex flex-col
        w-[362px]
        gap-[16px]
        px-[16px] py-[12px]
        bg-brown-100
        rounded-[12px]
        shadow-lg
        overflow-hidden
      "
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onItemClick?.(item.id)}
          className="
            flex items-start
            gap-[12px]
            text-left
            rounded-[12px]
            hover:bg-brown-200
          "
        >
          <img
            src={item.avatarUrl}
            alt={item.title}
            className="
              w-[40px] h-[40px]
              rounded-full
              object-cover
            "
          />

          <div className="flex flex-col gap-[4px]">
            <span className="text-body-1 text-brown-400">
              <span className="text-brown-500">
                {item.title}
              </span>{" "}
              {item.message}
            </span>

            <span className="text-body-3 text-brand-orange">
              {item.timeAgo}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
