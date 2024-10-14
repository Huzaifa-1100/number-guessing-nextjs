import * as React from "react";

// Utility function to conditionally join classNames
import { cn } from "@/lib/utils";

// Use a type alias instead of an interface to avoid the "no members" error
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        // Default type set to "text" to avoid undefined type issues
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props} // Spread other props to ensure full reusability
      />
    );
  }
);

// Set displayName for better debugging and component tree readability
Input.displayName = "Input";

export { Input };
