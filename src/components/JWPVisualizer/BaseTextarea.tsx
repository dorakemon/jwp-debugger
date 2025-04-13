import { useCallback, useEffect, useRef } from "react";

type BaseTextareaProps = {
  defaultValue?: string;
  minRows?: number;
  wrap?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (value: string) => void;
};

/**
 * Auto-resizing textarea component that adjusts its height based on content
 */
export const BaseTextarea = ({
  minRows = 12,
  wrap = true,
  className,
  children,
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
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
      className={`w-full resize-none focus:outline-none text-xs overflow-y-auto p-4 ${
        !wrap ? "whitespace-nowrap overflow-x-auto" : ""
      } ${className}`}
      style={{
        whiteSpace: wrap ? "pre-wrap" : "pre",
      }}
      rows={minRows}
      onChange={(e) => {
        onChange?.(e.target.value);
        console.log(e.target.value);
        adjustHeight();
      }}
    >
      {children}
    </textarea>
  );
};
