import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface FileUploadProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: File | null;
  label?: string;
  error?: boolean;
  onChange?: (file: File | null) => void;
}

export const FileUpload = ({
  value,
  className,
  error,
  onChange,
  label,
}: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onChange?.(file);
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

      <div className="text-base text-muted-foreground whitespace-nowrap border border-l-0 rounded-tr-[4px] rounded-br-[4px] border-gray-300 px-4 py-3 flex-1 truncate">
        {value?.name || label}
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
