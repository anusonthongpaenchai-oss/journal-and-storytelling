import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


type AutoCompleteItem = {
  id: string;
  title: string;
};

type Props = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
  suggestions: AutoCompleteItem[];
  onSelectPost: (id: string) => void;
};

{/* ================= Desktop ================= */ }
export function SearchControlsDesktop({
  categories,
  selectedCategory,
  onCategoryChange,
  query,
  onQueryChange,
  suggestions,
  onSelectPost,
}: Props) {
  return (
    <section
      className="
        flex flex-col
        items-start
        gap-[32px]
      "
    >
      <h3 className="text-headline-3">Latest articles</h3>

      <div
        className="
          flex flex-row
          justify-between items-center
          px-[24px] py-[16px]
          w-full
          bg-brown-200
          rounded-[16px]
        "
      >
        {/* Category Tabs */}
        <div className="flex flex-row gap-[8px]">
          {categories.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className="
                  px-[20px] py-[12px]
                  text-body-1
                  rounded-[16px]
                "
              >
                <span
                  className={
                    isActive
                      ? "bg-brown-300 text-brown-600 px-[20px] py-[12px] rounded-[16px]"
                      : "text-brown-500 hover:bg-brown-300 px-[20px] py-[12px] rounded-[16px]"
                  }
                >
                  {category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div
          className="
            relative
            w-[360px]
            h-[48px]
          "
        >
          <Input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search"
            autoComplete="off"
          />

          <button
            type="button"
            className="
              absolute
              right-3 top-1/2
              -translate-y-1/2
              text-brown-400
              hover:text-brown-600
            "
          >
            <Search className="w-[24px] h-[24px]" />
          </button>

          {/* Auto Complete */}
          {suggestions.length > 0 && (
            <div
              className="
                absolute
                p-1
                top-fdivl left-0
                mt-[8px]
                w-full
                bg-white
                border border-brown-200
                rounded-[12px]
                shadow-md
                z-10
              "
            >
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectPost(item.id)}
                  className="
                    px-[16px] py-[12px]
                    text-start
                    text-body-2
                    text-brown-600 hover:text-brown-400
                    hover:bg-brown-200
                    hover:border
                    hover:rounded-[12px]
                    cursor-pointer
                  "
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

{/* ================= Mobile ================= */ }
export function SearchControlsMobile({
  categories,
  selectedCategory,
  onCategoryChange,
  query,
  onQueryChange,
  suggestions,
  onSelectPost,
}: Props) {
  return (
    <section
      className="
        flex flex-col
      "
    >
      {/* Section Title */}
      <h3
        className="
          p-[16px]
          text-headline-3
        "
      >
        Latest articles
      </h3>

      {/* Controls */}
      <div
        className="
          flex flex-col
          gap-[16px]
          p-[16px]
          bg-brown-200
        "
      >
        {/* Search */}
        <div
          className="
            relative
            w-full
            h-[48px]
          "
        >
          <Input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search"
            autoComplete="off"
          />

          <button
            type="button"
            className="
              absolute
              right-3 top-1/2
              -translate-y-1/2
              text-brown-400
              hover:text-brown-600
            "
          >
            <Search className="w-[24px] h-[24px]" />
          </button>

          {/* Auto Complete */}
          {suggestions.length > 0 && (
            <div
              className="
                absolute
                p-1
                top-fdivl left-0
                mt-[8px]
                w-full
                bg-white
                border border-brown-200
                rounded-[12px]
                shadow-md
                z-10
              "
            >
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectPost(item.id)}
                  className="
                    px-[16px] py-[12px]
                    text-start
                    text-body-2
                    text-brown-600 hover:text-brown-400
                    hover:bg-brown-200
                    hover:border
                    hover:rounded-[12px]
                    cursor-pointer
                  "
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category */}
        <div
          className="
            flex flex-col
            gap-[4px]
            text-brown-400
          "
        >
          <h3 className="text-body-1">Category</h3>

          <Select
            value={selectedCategory}
            onValueChange={onCategoryChange}
          >
            <SelectTrigger
              className="
                w-full h-[48px]
              "
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
