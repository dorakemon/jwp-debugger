import { CardWithTextTitle } from "@/components/Card";
import { useState } from "react";

type PayloadItem = {
  claim: string;
  decoded: string;
  raw: string;
  disclosed: boolean;
};

type PayloadInputProps = {
  payload: PayloadItem[];
  onChange?: (payload: PayloadItem[]) => void;
};

export const PayloadInput: React.FC<PayloadInputProps> = ({
  payload,
  onChange,
}) => {
  const [tableData, setTableData] = useState<PayloadItem[]>(payload);

  const handleDecodedChange = (index: number, newDecoded: string) => {
    setTableData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, decoded: newDecoded } : item,
      ),
    );
    onChange?.(tableData);
  };

  const handleDisclosedChange = (index: number, newVal: boolean) => {
    setTableData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, disclosed: newVal } : item,
      ),
    );
  };

  return (
    <CardWithTextTitle title="PAYLOAD (Check to disclose)">
      <table className="min-w-full border-collapse border text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-2 py-1 text-left">Claim</th>
            <th className="border px-2 py-1 text-left">Decoded</th>
            <th className="border px-2 py-1 text-center" />
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index} className={!item.disclosed ? "bg-gray-300" : ""}>
              <td className="border px-2 py-1">{item.claim}</td>
              <td className="border px-2 py-1">
                <input
                  className="w-full rounded border px-2 py-1"
                  value={item.decoded}
                  onChange={(e) => handleDecodedChange(index, e.target.value)}
                />
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
    </CardWithTextTitle>
  );
};
