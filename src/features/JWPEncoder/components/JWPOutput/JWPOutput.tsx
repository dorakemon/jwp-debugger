import { CardWithTextTitle } from "@/components/Card";
import {
  IssuedJWPTextarea,
  PresentedJWPTextarea,
} from "@/components/JWPVisualizer";
import { useDebuggerStore } from "@/store/context";

export const JWPOutput = () => {
  const { issuedFormJWP, presentedFormJWP } = useDebuggerStore();
  return (
    <>
      <CardWithTextTitle title="ISSUED FORM JWP" disabled>
        <IssuedJWPTextarea value={issuedFormJWP} disabled minRows={20} />
      </CardWithTextTitle>
      <CardWithTextTitle title={"PRESENTED FORM JWP"} disabled>
        <PresentedJWPTextarea value={presentedFormJWP} disabled minRows={20} />
      </CardWithTextTitle>
    </>
  );
};
