import { useIsMobile } from "@/hooks/useIsMobile";
import { useDebuggerStore } from "@/store/context";
import { useSelectIssuedOrPresented } from "../hooks/useSelectIssuedOrPresented";
import { useValidateResult } from "../hooks/useValidateResult";
import { useVerifyResult } from "../hooks/useVerifyResult";
import { JWPInput } from "./JWPInput";
import { HeaderOutput, PayloadOutput } from "./JWPOutput";
import { PubKeyInput } from "./PubKeyInput";

export const JWPDecoder = () => {
  const isMobile = useIsMobile();
  const { jwk, setJwk } = useDebuggerStore();
  const { issuedOrPresented, handleSelectIssuedOrPresented } =
    useSelectIssuedOrPresented();
  const { getIssuedFormattedData, getPresentedFormattedData } =
    useValidateResult();
  const {
    isValidJWK,
    getIssuedVerificationData,
    getPresentedVerificationData,
  } = useVerifyResult(jwk);
  const issuedData = getIssuedFormattedData();
  const presentedData = getPresentedFormattedData();
  const issuedVerificationData = getIssuedVerificationData();
  const presentedVerificationData = getPresentedVerificationData();

  return (
    <div>
      <div className="mb-4 font-light16 text-sm">
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
            isseuedFormStatus={{
              isValid: issuedData.isValid,
              validationError: issuedData.validationError,
              isVerified: issuedVerificationData.isVerified,
              verificationError: issuedVerificationData.verificationError ?? "",
            }}
            presentedFormStatus={{
              isValid: presentedData.isValid,
              validationError: presentedData.validationError,
              isVerified: presentedVerificationData.isVerified,
              verificationError:
                presentedVerificationData.verificationError ?? "",
            }}
          />
        </div>
        <div
          className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col space-y-4`}
        >
          <div className="mb-2 font-medium text-sm">DECODED HEADER</div>
          {issuedOrPresented === "issued" ? (
            <>
              <HeaderOutput
                title="ISSUER PROTECTED HEADER"
                encodedValue={issuedData.issuerHeader}
              />
              <div className="mb-2 font-medium text-sm">DECODED PAYLOAD</div>
              <PayloadOutput payload={issuedData.payloads ?? []} />
            </>
          ) : (
            <>
              <HeaderOutput
                title="ISSUER PROTECTED HEADER"
                encodedValue={presentedData.issuerHeader}
              />
              <HeaderOutput
                title="PRESENTATION PROTECTED HEADER"
                encodedValue={presentedData.presentationHeader}
              />
              <div className="mb-2 font-medium text-sm">DECODED PAYLOAD</div>
              <PayloadOutput payload={presentedData.payloads ?? []} />
            </>
          )}
          <PubKeyInput
            publicKeyString={jwk}
            isValidJWK={isValidJWK}
            onChange={setJwk}
          />
        </div>
      </div>
    </div>
  );
};
