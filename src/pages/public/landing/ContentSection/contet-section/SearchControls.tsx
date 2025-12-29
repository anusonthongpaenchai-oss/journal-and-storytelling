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
    /* ContentControls */
    <div
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
        {/* Tabs */}
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
        <div className="relative w-[360px] h-[48px]">
          <Input
            type="search"
            placeholder="Search"
            className="
          h-full
          bg-white
          placeholder-body-1
          placeholder:text-brown-400
        "
          />

          {/* Icon Search */}
          <button
            type="button"
            className="
          absolute right-3 top-1/2
          -translate-y-1/2
          text-brown-400
          hover:text-brown-600
        "
          >
            <Search className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function SearchControlsMobile() {
  return (
    <div className="flex flex-col ">
      {/* Text */}
      <h3 className="p-[16px] text-headline-3">Latest articles</h3>

      {/* Search and Category*/}
      <div
        className="
          flex flex-col
          gap-[16px]
          p-[16px]
          bg-brown-200
          "
      >
        {/* Search */}
        <div className="relative">
          {/* Box Search */}
          <Input
            type="search"
            placeholder="Search"
            className="
                w-full h-[48px]
                bg-white
                border
                placeholder-body-1
                placeholder:text-brown-400
                "
          />

          {/* Icon Search */}
          <button
            type="button"
            className="
                absolute right-3 top-1/2
                -translate-y-1/2
               text-brown-400
               hover:text-brown-600
                "
          >
            <Search className="w-[16px] h-[16px]" />
          </button>
        </div>

        {/* Select */}
        <div
          className="
            flex flex-col 
            gap-[4px]
            text-brown-400
            "
        >
          {/* Text */}
          <h3 className="text-body-1"> Category </h3>

          {/* Select Box */}
          <Select>
            <SelectTrigger className="
                        w-full h-[48px]
                       bg-white 
                       data-[placeholder]:text-body-1">
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
  );
}
