import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full h-full appearance-none px-3 py-1 bg-white text-body-1 border border-brown-300 rounded-md shadow-sm transition-colors placeholder-body-1 placeholder:text-brown-400 focus:outline-none focus:ring-0 focus:border-red-500 focus:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
