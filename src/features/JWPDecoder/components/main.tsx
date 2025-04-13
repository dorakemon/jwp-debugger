import { useIsMobile } from "@/hooks/useIsMobile";
import { useSelectIssuedOrPresented } from "../hooks/useSelectIssuedOrPresented";
import { JWPInput } from "./JWPInput";
import { JWPOutput } from "./JWPOutput";
import { PubKeyInput } from "./PubKeyInput";

export const JWPDecoder = () => {
  const isMobile = useIsMobile();
  const { issuedOrPresented, handleSelectIssuedOrPresented } =
    useSelectIssuedOrPresented();
  return (
    <div>
      <div className="font-light16 text-sm mb-4">
        Paste a JWP below that you'd like to decode, validate, and verify.
      </div>
      <div
        className={`flex ${isMobile ? "flex-col space-y-6" : "flex-row space-x-6"} w-full`}
      >
        <div className={`${isMobile ? "w-full" : "w-1/2"}`}>
          <JWPInput
            isMobile={isMobile}
            issuedOrPresented={issuedOrPresented}
            handleSelectIssuedOrPresented={handleSelectIssuedOrPresented}
          />
        </div>
        <div
          className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col space-y-4`}
        >
          {issuedOrPresented === "issued" ? (
            <>
              <JWPOutput title="DECODED ISSUER PROTECTED HEADER" />
              <JWPOutput title="DECODED ISSUER PAYLOADS" />
            </>
          ) : (
            <>
              <JWPOutput title="DECODED PRESENTED PROTECTED HEADER" />
              <JWPOutput title="DECODED ISSUER PROTECTED HEADER" />
              <JWPOutput title="DECODED PRESENTATION PAYLOADS" />
            </>
          )}
          <PubKeyInput
            publicKeyString={JSON.stringify(
              {
                kty: "EC",
                crv: "BLS12381G2",
                x: "FBTfTNT7JiPtxE32futIRKd4Y1PW26e09M55IRQ0Wp9WqwP6Th03fDtgwc14zyWxBAEsX06vLQ9Huh4YavayvSZRPS_il2OCXqAqQAmijbFb39lstaMy5bPKzwXtC-G0",
                y: "DoS1pMjDSfJzmir0xdwq9-1cm705j7PZ-hOmRdoajzqkSQDen7mxDaVzxwuMFVVHEwkODf3IKaHnh1R59GqsVP9WPWfQ1ibDizjw-R5trpF2wF8FWeKCX9VSKmpf9nYI",
                d: "KCdtD0YLaXK0ZbyVaZ0Fd51HnL4uZVS2lrM1Q6G3iJ4",
              },
              null,
              2,
            )}
          />
        </div>
      </div>
    </div>
  );
};
