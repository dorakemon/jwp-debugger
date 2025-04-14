import { CardWithTextTitle } from "@/components/Card";
import { BaseTextarea } from "@/components/JWPVisualizer/BaseTextarea";
import { StatusBanner } from "@/components/StatusBanner";

type PubKeyInputProps = {
  publicKeyString?: string;
  isValidJWK?: boolean;
  onChange?: (value: string) => void;
};

export const PubKeyInput = ({
  publicKeyString,
  isValidJWK,
  onChange = () => {},
}: PubKeyInputProps) => {
  return (
    <div>
      <div className="mb-2 font-medium text-sm">
        JWP Proof Verification (Optional)
      </div>
      <div className="flex flex-col space-y-4">
        <CardWithTextTitle title={"Public Key"}>
          {isValidJWK ? (
            <StatusBanner status="success">Public Key is valid</StatusBanner>
          ) : (
            <StatusBanner status="error">Invalid Public Key</StatusBanner>
          )}
          <BaseTextarea
            value={publicKeyString}
            className="font-medium"
            wrap={false}
            minRows={7}
            onChange={onChange}
          />
        </CardWithTextTitle>
      </div>
    </div>
  );
};
