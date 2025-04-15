import { BaseTextarea } from "./BaseTextarea";

const COLORS = [
  "text-green-700",
  "text-orange-700",
  "text-black",
  "text-blue-700",
];

export type PresentedJWPTextareaProps = {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  minRows?: number;
};

export const PresentedJWPTextarea: React.FC<PresentedJWPTextareaProps> = ({
  value,
  onChange = () => {},
  disabled,
  minRows = 12,
}) => {
  const parts = value.split(".");

  return (
    <div className="relative w-full">
      <pre
        aria-hidden="true"
        className="pointer-events-none whitespace-pre-wrap break-words p-4 font-mono text-sm"
        style={{
          position: "absolute",
          inset: 0,
          color: "transparent",
        }}
      >
        {parts.map((part, idx) => (
          <span key={idx}>
            <span className={`${COLORS[idx] ?? "text-black"}`}>{part}</span>
            {idx < parts.length - 1 && <span className="text-gray-600">.</span>}
          </span>
        ))}
      </pre>

      <BaseTextarea
        value={value}
        onChange={onChange}
        minRows={minRows}
        disabled={disabled}
        className="relative bg-transparent p-4 font-mono text-sm text-transparent caret-black "
      />
    </div>
  );
};
