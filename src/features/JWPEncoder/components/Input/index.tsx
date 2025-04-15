import { useValidateResult } from "@/features/JWPDecoder/hooks/useValidateResult";
import { useVerifyResult } from "@/features/JWPDecoder/hooks/useVerifyResult";
import { generateIssuedAndPresentedJWP } from "@/libs/generate/generateJWP";
import { useDebuggerStore } from "@/store/context";
import { useMemo, useState } from "react";
import { HeaderInput } from "./HeaderInput";
import { PayloadInput } from "./PayloadInput";
import { PrivKeyInput } from "./PrivKeyInput";

export const EncoderInput = () => {
  const { isValidJWK } = useVerifyResult();
  const { jwk, setIssuedFormJWP, setPresentedFormJWP } = useDebuggerStore();
  const { getIssuedFormattedData, getPresentedFormattedData } =
    useValidateResult();
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
    <>
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
    </>
  );
};
