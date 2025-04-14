import { CardWithTabsTitle } from "@/components/Card";
import { useMemo, useState } from "react";

type PayloadOutputProps = {
  payload: Array<{ raw: string; decoded: string; claim: string }>;
};

export const PayloadOutput = ({ payload }: PayloadOutputProps) => {
  const [activeTabKey, setActiveTabKey] = useState("table");
  const cardContent = useMemo(() => {
    if (activeTabKey === "table") {
      return (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {payload.map((item, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="py-3 px-4 text-sm font-medium whitespace-nowrap border-r border-gray-200 w-1/4">
                    {item.claim}
                  </td>
                  <td className="py-3 px-4 text-sm w-1/2 bg-gray-50">
                    {item.decoded}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (activeTabKey === "decoded") {
      return (
        <div className="p-4">
          {payload && (
            <pre className="text-sm whitespace-pre overflow-x-auto">
              {JSON.stringify(
                payload.map((item) => item.decoded),
                null,
                2,
              )}
            </pre>
          )}
        </div>
      );
    }
    if (activeTabKey === "raw") {
      return (
        <div className="p-4">
          {payload && (
            <pre className="text-sm whitespace-pre overflow-x-auto">
              {JSON.stringify(
                payload.map((item) => item.raw),
                null,
                2,
              )}
            </pre>
          )}
        </div>
      );
    }
  }, [activeTabKey, payload]);

  return (
    <div className="flex flex-col space-y-4">
      <CardWithTabsTitle
        tabTitles={{
          table: "Table",
          decoded: "Decoded",
          raw: "Raw",
        }}
        activeTabKey={activeTabKey}
        onTabClick={(tabKey) => {
          setActiveTabKey(tabKey);
        }}
        disabled={true}
      >
        {cardContent}
      </CardWithTabsTitle>
    </div>
  );
};
