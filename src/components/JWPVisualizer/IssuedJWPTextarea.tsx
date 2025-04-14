import { BaseTextarea } from "./BaseTextarea";

const COLORS = ["green", "black", "blue"];

export type IssuedJWPTextareaProps = {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export const IssuedJWPTextarea: React.FC<IssuedJWPTextareaProps> = ({
  value,
  onChange = () => {},
  disabled,
}) => {
  const parts = value.split(".");

  return (
    <div className="relative w-full">
      <pre
        aria-hidden="true"
        className="pointer-events-none whitespace-pre-wrap break-words p-4 font-mono text-xs"
        style={{
          position: "absolute",
          inset: 0,
          color: "transparent",
        }}
      >
        {parts.map((part, idx) => (
          <span key={idx}>
            <span style={{ color: COLORS[idx] || "black" }}>{part}</span>
            {idx < parts.length - 1 && <span style={{ color: "gray" }}>.</span>}
          </span>
        ))}
      </pre>

      <BaseTextarea
        value={value}
        onChange={onChange}
        minRows={12}
        disabled={disabled}
        className="relative bg-transparent p-4 font-mono text-transparent text-xs caret-black "
      />
    </div>
  );
};
