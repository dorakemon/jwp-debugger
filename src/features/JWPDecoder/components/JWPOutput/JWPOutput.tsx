import { CardWithTabsTitle } from "@/components/Card";
import { OutputJSONOrTable } from "../../constants";

type JWPOutputProps = {
  title: string;
  encodedValue?: string;
  isValid?: boolean;
  validationError?: string;
  isVerified?: boolean;
  verificationError?: string;
};

export const JWPOutput = ({ title, encodedValue }: JWPOutputProps) => {
  return (
    <div>
      <div className="text-sm font-medium mb-2">{title}</div>
      <div className="flex flex-col space-y-4">
        <CardWithTabsTitle
          activeTabKey="json"
          tabTitles={OutputJSONOrTable}
          disabled
        >
          <div className="p-4">
            {encodedValue && (
              <pre className="text-sm whitespace-pre overflow-x-auto">
                {encodedValue}
              </pre>
            )}
          </div>
        </CardWithTabsTitle>
      </div>
    </div>
  );
};
