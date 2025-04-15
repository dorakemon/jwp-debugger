import { CardWithTextTitle } from "@/components/Card";
import { EditableJSON } from "@/components/JWPVisualizer";
import { StatusBanner } from "@/components/StatusBanner";

type PubKeyInputProps = {
  privateKeyString?: string;
  isValidJWK?: boolean;
  onChange?: (value: string) => void;
};

export const PrivKeyInput = ({
  privateKeyString,
  isValidJWK,
  onChange = () => {},
}: PubKeyInputProps) => {
  return (
    <div>
      <div className="mb-2 font-medium text-sm">JWP Proof Generation</div>
      <div className="flex flex-col space-y-4">
        <CardWithTextTitle title={"Private Key"}>
          {isValidJWK ? (
            <StatusBanner status="success">Private Key is valid</StatusBanner>
          ) : (
            <StatusBanner status="error">Invalid Private Key</StatusBanner>
          )}
          <div className="p-4">
            <EditableJSON
              jsonData={privateKeyString ?? ""}
              className="font-medium"
              onChange={onChange}
            />
          </div>
        </CardWithTextTitle>
      </div>
    </div>
  );
};
