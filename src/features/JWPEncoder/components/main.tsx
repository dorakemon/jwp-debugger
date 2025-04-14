import { useIsMobile } from "@/hooks/useIsMobile";
import { useDebuggerStore } from "@/store/context";
import { HeaderInput } from "./Input";
import { JWPOutput } from "./JWPOutput";

export const JWPEncoder = () => {
  const isMobile = useIsMobile();
  const { issuedFormJWP, presentedFormJWP } = useDebuggerStore();

  return (
    <div>
      <div className="mb-4 font-light16 text-sm">
        Fill in the fields below to generate JWPs.
      </div>
      <div
        className={`flex ${isMobile ? "flex-col space-y-6" : "flex-row space-x-6"} w-full`}
      >
        <div className={`${isMobile ? "w-full" : "w-1/2"}`}>
          <HeaderInput title="ISSUER PROTECTED HEADER" />
          <HeaderInput title="PRESENTATION PROTECTED HEADER" />
        </div>
        <div
          className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col space-y-4`}
        >
          <JWPOutput
            issuedJwp={issuedFormJWP}
            presentedJwp={presentedFormJWP}
          />
          {/* <PubKeyInput
            publicKeyString={jwk}
            isValidJWK={isValidJWK}
            onChange={setJwk}
          /> */}
        </div>
      </div>
    </div>
  );
};
