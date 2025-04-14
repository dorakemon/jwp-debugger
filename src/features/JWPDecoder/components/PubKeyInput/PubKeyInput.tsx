import { CardWithTextTitle } from "@/components/Card";
import { BaseTextarea } from "@/components/JWPVisualizer/BaseTextarea";
import { StatusBanner } from "@/components/StatusBanner";

type PubKeyInputProps = {
  publicKeyString?: string;
};

export const PubKeyInput = ({ publicKeyString }: PubKeyInputProps) => {
  return (
    <div>
      <div className="text-sm font-medium mb-2">
        JWP Proof Verification (Optional)
      </div>
      <div className="flex flex-col space-y-4">
        <CardWithTextTitle title={"Public Key"}>
          <StatusBanner status="error">Not implemented yet</StatusBanner>
          <BaseTextarea
            value={publicKeyString}
            className="font-medium"
            wrap={false}
            minRows={7}
          />
        </CardWithTextTitle>
      </div>
    </div>
  );
};
