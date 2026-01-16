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

type Props = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export function SearchControlsDesktop({
  categories,  
  selectedCategory,
  onCategoryChange,
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
                className={`
                  px-[20px] py-[12px]
                  text-body-1
                  rounded-[16px]
                  ${
                    isActive
                      ? "bg-brown-300 text-brown-600"
                      : "text-brown-500 hover:bg-brown-300"
                  }
                `}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div
          className="
            relative
            w-[360px] h-[48px]
          "
        >
          <Input
            type="text"
            placeholder="Search"
            autoComplete="on"
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
        </div>
      </div>
    </section>
  );
}


export function SearchControlsMobile({
  categories,
  selectedCategory,
  onCategoryChange,
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
            h-[48px]
          "
        >
          <Input
            type="text"
            placeholder="Search"
            autoComplete="on"
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

          {/* Select (ของเดิมคุณ) */}
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
