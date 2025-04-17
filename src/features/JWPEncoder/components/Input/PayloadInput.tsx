import { CardWithTabsTitle } from "@/components/Card";
import { EditableJSON } from "@/components/JWPVisualizer";
import { useEffect, useState } from "react";

type Payload = {
  claims: string[];
  decodedString: string;
  disclosed: boolean[];
};

type PayloadInputProps = {
  payload: Payload;
  onChange?: (payload: Payload) => void;
};

export const PayloadInput: React.FC<PayloadInputProps> = ({
  payload,
  onChange,
}) => {
  const [activeTabKey, setActiveTabKey] = useState<"json" | "table">("json");

  const [decodedString, setDecodedString] = useState<string>(
    payload.decodedString,
  );

  const [disclosed, setDisclosed] = useState<boolean[]>(payload.disclosed);

  const handleJsonChange = (newJsonString: string) => {
    setDecodedString(newJsonString);

    try {
      JSON.parse(newJsonString);

      onChange?.({
        claims: payload.claims,
        decodedString: newJsonString,
        disclosed,
      });
    } catch (error) {
      console.warn("JSON Parse Error", error);
    }
  };

  const handleDisclosedChange = (index: number, newVal: boolean) => {
    const newDisclosed = [...disclosed];
    newDisclosed[index] = newVal;
    setDisclosed(newDisclosed);

    onChange?.({
      claims: payload.claims,
      decodedString,
      disclosed: newDisclosed,
    });
  };

  const getTableData = () => {
    try {
      const parsedDecoded = JSON.parse(decodedString);
      if (Array.isArray(parsedDecoded)) {
        return payload.claims.map((claim, index) => ({
          claim,
          decodedValue:
            parsedDecoded[index] !== undefined
              ? typeof parsedDecoded[index] === "object"
                ? JSON.stringify(parsedDecoded[index])
                : String(parsedDecoded[index])
              : "",
          disclosed: disclosed[index] || false,
        }));
      }
    } catch (error) {
      console.warn("Table Data Generation Error:", error);
    }
    // Fallback if JSON parsing fails or not an array
    return payload.claims.map((claim, index) => ({
      claim,
      decodedValue: "",
      disclosed: disclosed[index] || false,
    }));
  };

  // Synchronization process when payload changes
  useEffect(() => {
    setDecodedString(payload.decodedString);
    setDisclosed([...payload.disclosed]);
  }, [payload.decodedString, payload.disclosed]);

  return (
    <CardWithTabsTitle
      activeTabKey={activeTabKey}
      tabTitles={{ json: "JSON", table: "TABLE (Check to disclose)" }}
      onTabClick={(item) => setActiveTabKey(item as "json" | "table")}
    >
      {activeTabKey === "json" ? (
        <div className="p-4">
          <EditableJSON jsonData={decodedString} onChange={handleJsonChange} />
        </div>
      ) : (
        <table className="min-w-full border-collapse border text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-2 py-1 text-left">Claim</th>
              <th className="border px-2 py-1 text-left">Decoded Value</th>
              <th className="border px-2 py-1 text-center" />
            </tr>
          </thead>
          <tbody>
            {getTableData().map((item, index) => (
              <tr key={index} className={!item.disclosed ? "bg-gray-100" : ""}>
                <td className="border px-2 py-1">{item.claim}</td>
                <td className="border px-2 py-1">
                  <div className="w-full overflow-x-auto px-2 py-1 font-mono">
                    {item.decodedValue}
                  </div>
                </td>
                <td className="border px-1 text-center">
                  <input
                    type="checkbox"
                    checked={item.disclosed}
                    onChange={(e) =>
                      handleDisclosedChange(index, e.target.checked)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </CardWithTabsTitle>
  );
};
