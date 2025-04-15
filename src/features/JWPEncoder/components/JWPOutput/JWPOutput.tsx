import { CardWithTextTitle } from "@/components/Card";
import {
  IssuedJWPTextarea,
  PresentedJWPTextarea,
} from "@/components/JWPVisualizer";

type JWPOutputProps = {
  issuedJwp: string;
  presentedJwp: string;
};

export const JWPOutput: React.FC<JWPOutputProps> = ({
  issuedJwp,
  presentedJwp,
}) => {
  return (
    <>
      <CardWithTextTitle title="ISSUED FORM JWP" disabled>
        <IssuedJWPTextarea value={issuedJwp} disabled minRows={20} />
      </CardWithTextTitle>
      <CardWithTextTitle title={"PRESENTED FORM JWP"} disabled>
        <PresentedJWPTextarea value={presentedJwp} disabled minRows={20} />
      </CardWithTextTitle>
    </>
  );
};
