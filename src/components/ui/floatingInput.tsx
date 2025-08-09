import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useMaskito } from "@maskito/react";
import options from "@/lib/mask";

interface FloatingInputProps extends React.ComponentProps<"input"> {
  label: string;
  error?: boolean;
  phone?: boolean;
  req?: boolean;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    { label, className, error, id, name, req, phone = false, ...props },
    ref
  ) => {
    const inputId = id || name;
    const hasValue =
      props.value !== undefined
        ? Boolean(props.value)
        : Boolean((props.defaultValue as string) || "");

    const maskedInputRef = useMaskito({ options });

    return (
      <div className="relative w-full">
        {req && (
          <span className="absolute top-[2px] right-[5px] text-gray-500">
            *
          </span>
        )}

        <input
          id={inputId}
          ref={phone ? maskedInputRef : ref}
          className={cn(
            "peer block w-full border border-gray-300 rounded-[4px] px-3 py-[14px] text-base text-gray-900 placeholder-transparent focus:outline-none transition",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-gray-300",
            className
          )}
          {...props}
        />

        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10 px-1 pointer-events-none transition-all duration-200 bg-background",
            hasValue ? "top-0 text-xs px-1 py-0 -translate-y-1/2" : "",
            "peer-focus:top-0 peer-focus:text-xs peer-focus:px-1 peer-focus:py-0 peer-focus:-translate-y-1/2",
            error
              ? "text-red-500 peer-focus:text-red-500"
              : "text-gray-500 peer-focus:text-gray-500"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";
