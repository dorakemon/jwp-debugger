import { cn } from "@/libs/tailwindUtils";
import { useCallback, useEffect, useRef } from "react";

type BaseTextareaProps = {
  value?: string;
  minRows?: number;
  wrap?: boolean;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange?: (value: string) => void;
};

/**
 * Auto-resizing textarea component that adjusts its height based on content
 */
export const BaseTextarea = ({
  value = "",
  minRows = 12,
  wrap = true,
  disabled = false,
  className,
  onChange,
}: BaseTextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to adjust textarea height based on content
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  // Adjust height on initial render
  useEffect(() => {
    adjustHeight();
  }, [adjustHeight]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
      className={cn(
        "w-full cursor-text resize-none overflow-y-auto text-xs focus:outline-none",
        !wrap ? "overflow-x-auto whitespace-nowrap" : "",
        className,
      )}
      style={{
        whiteSpace: wrap ? "pre-wrap" : "pre",
      }}
      disabled={disabled}
      rows={minRows}
      onChange={(e) => {
        onChange?.(e.target.value);
        adjustHeight();
      }}
    />
  );
};
