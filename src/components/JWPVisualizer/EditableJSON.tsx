import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import jsonLang from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import stackoverflowLight from "react-syntax-highlighter/dist/esm/styles/hljs/xcode";
import { BaseTextarea } from "./BaseTextarea";

SyntaxHighlighter.registerLanguage("json", jsonLang);

type JSONHighlighterProps = {
  jsonData: string;
  className?: string;
  onChange?: (value: string) => void;
};

export const EditableJSON: React.FC<JSONHighlighterProps> = ({
  jsonData,
  className = "",
  onChange,
}) => {
  return (
    <div className={`relative w-full text-xs ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 overflow-auto"
        style={{
          padding: "0px",
          zIndex: 0,
        }}
      >
        <SyntaxHighlighter
          language="json"
          style={stackoverflowLight}
          wrapLongLines={true}
          wrapLines={true}
          customStyle={{
            padding: "0px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            background: "transparent",
            width: "100%",
            height: "100%",
          }}
        >
          {jsonData}
        </SyntaxHighlighter>
      </div>
      <BaseTextarea
        value={jsonData}
        onChange={onChange}
        wrap={true}
        minRows={5}
        className="relative bg-transparent text-transparent text-xs caret-black"
      />
    </div>
  );
};
