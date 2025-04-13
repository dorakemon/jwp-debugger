import { CardWithTextTitle } from "@/components/Card";
import { BaseTextarea } from "@/components/JWPVisualizer/BaseTextarea";

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
          <BaseTextarea className="font-medium" wrap={false} minRows={7}>
            {publicKeyString}
          </BaseTextarea>
        </CardWithTextTitle>
      </div>
    </div>
  );
};
