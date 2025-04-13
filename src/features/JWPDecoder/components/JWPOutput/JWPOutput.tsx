import { CardWithTabsTitle } from "@/components/Card";
import { OutputJSONOrTable } from "../../constants";

type JWPOutputProps = {
  title: string;
  encodedValue?: string;
};

export const JWPOutput = ({ title, encodedValue }: JWPOutputProps) => {
  return (
    <div>
      <div className="text-sm font-medium mb-2">{title}</div>
      <div className="flex flex-col space-y-4">
        <CardWithTabsTitle
          activeTabKey="json"
          tabTitles={OutputJSONOrTable}
          onTabClick={() => {}}
          disabled
        >
          {encodedValue && <div>{encodedValue}</div>}
        </CardWithTabsTitle>
      </div>
    </div>
  );
};
