import { useValidateResult } from "@/features/JWPDecoder/hooks/useValidateResult";
import { useVerifyResult } from "@/features/JWPDecoder/hooks/useVerifyResult";
import { useIsMobile } from "@/hooks/useIsMobile";
import { generateIssuedAndPresentedJWP } from "@/libs/generate/generateJWP";
import { useDebuggerStore } from "@/store/context";
import { useMemo, useState } from "react";
import { HeaderInput, PayloadInput, PrivKeyInput } from "./Input";
import { JWPOutput } from "./JWPOutput";

export const JWPEncoder = () => {
  const isMobile = useIsMobile();
  const { getIssuedFormattedData, getPresentedFormattedData } =
    useValidateResult();
  const { isValidJWK } = useVerifyResult();
  const { jwk, setIssuedFormJWP, setPresentedFormJWP } = useDebuggerStore();
  const {
    initPresentationHeader,
    initIssuerHeader,
    initPayloads,
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  } = useMemo(() => {
    const {
      presentationHeader: initPresentationHeader,
      payloads: presentationPayload,
      issuerHeader: initIssuerHeader,
    } = getPresentedFormattedData();
    const { payloads: initPayloads } = getIssuedFormattedData();
    const payloadWithDisclosed = initPayloads.map((item, index) => {
      const disclosed = presentationPayload[index].decoded !== "";
      return {
        ...item,
        disclosed,
      };
    });
    return {
      initPresentationHeader,
      initIssuerHeader,
      initPayloads: payloadWithDisclosed,
    };
  }, []);
  const [issuerHeader, setIssuerHeader] = useState(initIssuerHeader);
  const [presentationHeader, setPresentationHeader] = useState(
    initPresentationHeader,
  );
  const [payloads, setPayloads] = useState(initPayloads);

  const { issued: generatedIssuedJwp, presented: generatedPresentedJwp } =
    useMemo(() => {
      const disclosedClaims = payloads.filter((item) => item.disclosed);
      console.log("何変わった");
      const result = generateIssuedAndPresentedJWP(
        payloads,
        presentationHeader,
        disclosedClaims.map((item) => item.claim),
        jwk,
      );
      setIssuedFormJWP(result.issued);
      setPresentedFormJWP(result.presented);
      return result;
    }, [
      payloads,
      presentationHeader,
      jwk,
      setIssuedFormJWP,
      setPresentedFormJWP,
    ]);

  return (
    <div>
      <div className="mb-4 font-light16 text-sm">
        Fill in the fields below to generate JWPs.
      </div>
      <div
        className={`flex ${isMobile ? "flex-col space-y-6" : "flex-row space-x-6"} w-full`}
      >
        <div
          className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col space-y-4`}
        >
          <HeaderInput
            title="ISSUER PROTECTED HEADER"
            value={issuerHeader}
            onChange={setIssuerHeader}
          />
          <HeaderInput
            title="PRESENTATION PROTECTED HEADER"
            value={presentationHeader}
            onChange={setPresentationHeader}
          />
          <PayloadInput payload={payloads} onChange={setPayloads} />
          <PrivKeyInput
            privateKeyString={jwk}
            isValidJWK={isValidJWK}
            onChange={() => {}}
          />
        </div>
        <div
          className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col space-y-4`}
        >
          <JWPOutput
            issuedJwp={generatedIssuedJwp}
            presentedJwp={generatedPresentedJwp}
          />
        </div>
      </div>
    </div>
  );
};
