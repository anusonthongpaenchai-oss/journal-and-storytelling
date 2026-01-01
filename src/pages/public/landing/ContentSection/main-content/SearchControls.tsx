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

export function SearchControlsDesktop() {
  return (
    <section
      className="
        flex flex-col
        items-start
        gap-[32px]
      "
    >
      {/* Content Controls */}
      {/* - Desktop-only controls for article filtering and search */}

      {/* Section Title */}
      <h3 className="text-headline-3">Latest articles</h3>

      {/* Controls Bar */}
      {/* - Tabs on the left, search input on the right */}
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
        <div
          className="
            flex flex-row
            gap-[8px]
          "
        >
          {["Highlight", "Cat", "Inspiration", "General"].map((label) => (
            <button
              key={label}
              type="button"
              className="
                px-[20px] py-[12px]
                text-body-1
                text-brown-500
                rounded-[16px]
                hover:bg-brown-300
              "
            >
              {label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        {/* - Text input with trailing search icon */}
        <div
          className="
            relative
            w-[360px] h-[48px]
          "
        >
          <Input type="text" placeholder="Search" autoComplete="on" />

          {/* Search Icon */}
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
            <Search className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function SearchControlsMobile() {
  return (
    <section
      className="
    flex flex-col
  "
    >
      {/* Mobile Content Controls */}
      {/* - Displays title, search input, and category filter for mobile view */}

      {/* Section Title */}
      <h3
        className="
      p-[16px]
      text-headline-3
    "
      >
        Latest articles
      </h3>

      {/* Search & Category Controls */}
      <div
        className="
      flex flex-col
      gap-[16px]
      p-[16px]
      bg-brown-200
    "
      >
        {/* Search */}
        {/* - Text input with search icon */}
        <div
          className="
        relative
        h-[48px]
      "
        >
          {/* Search Input */}
          <Input type="text" placeholder="Search" autoComplete="on" />

          {/* Search Icon */}
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
            <Search className="w-[16px] h-[16px]" />
          </button>
        </div>

        {/* Category Filter */}
        {/* - Select dropdown for article categories */}
        <div
          className="
        flex flex-col
        gap-[4px]
        text-brown-400
      "
        >
          {/* Category Label */}
          <h3 className="text-body-1">Category</h3>

          {/* Select Box */}
          <div className="text-body-1 text-brown-400">
            <Select>
              <SelectTrigger
                className="
            w-full h-[48px]
          "
              >
                <SelectValue placeholder="Highlight" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="highlight">Highlight</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="inspiration">Inspiration</SelectItem>
                  <SelectItem value="ganeral">Ganeral</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
