import { CardWithTextTitle } from "@/components/Card";
import { EditableJSON } from "@/components/JWPVisualizer";

type HeaderOutputProps = {
  title: string;
  encodedValue?: string;
  isValid?: boolean;
  validationError?: string;
  isVerified?: boolean;
  verificationError?: string;
};

export const HeaderOutput = ({ title, encodedValue }: HeaderOutputProps) => {
  return (
    <div className="flex flex-col space-y-4">
      <CardWithTextTitle title={title} disabled>
        <div className="p-4">
          {encodedValue && <EditableJSON jsonData={encodedValue} />}
        </div>
      </CardWithTextTitle>
    </div>
  );
};
