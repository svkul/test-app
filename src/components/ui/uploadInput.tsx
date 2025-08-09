import { useRef } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: File | null;
  label?: string;
  error?: boolean;
  req?: boolean;
  onChange?: (file: File | null) => void;
}

export const FileUpload = ({
  value,
  className,
  error,
  label,
  req,
  onChange,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange?.(file);
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange?.(null);
  };

  return (
    <div className="w-full flex items-center overflow-hidden">
      <Button
        className={cn(
          "rounded-none rounded-l-[4px]",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-900 focus:border-gray-900",
          className
        )}
        type="button"
        variant="upload"
        size="upload"
        onClick={handleClick}
      >
        Upload
      </Button>

      <div
        className={cn(
          "relative flex items-center text-base text-muted-foreground whitespace-nowrap border border-l-0 rounded-tr-[4px] rounded-br-[4px] border-gray-300 px-4 min-h-[54px] flex-1",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-gray-300"
        )}
        onClick={handleClick}
      >
        {req && (
          <span className="absolute top-[2px] right-[5px] text-gray-500">
            *
          </span>
        )}

        <p className="absolute left-[8px] right-[40px] truncate">
          {value?.name || label}
        </p>

        {value && (
          <Button
            className="ml-auto"
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
          >
            <Trash2 />
          </Button>
        )}
      </div>

      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};
