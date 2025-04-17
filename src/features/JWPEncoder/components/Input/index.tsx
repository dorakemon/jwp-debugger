import { useValidateResult } from "@/features/JWPDecoder/hooks/useValidateResult";
import { useVerifyResult } from "@/features/JWPDecoder/hooks/useVerifyResult";
import { generateIssuedAndPresentedJWP } from "@/libs/generate/generateJWP";
import { useDebuggerStore } from "@/store/context";
import { useMemo, useState } from "react";
import { HeaderInput } from "./HeaderInput";
import { PayloadInput } from "./PayloadInput";
import { PrivKeyInput } from "./PrivKeyInput";

// FIXME: There is an isssue with header processing.

export const EncoderInput = () => {
  const { isValidJWK } = useVerifyResult();
  const { jwk, setIssuedFormJWP, setPresentedFormJWP } = useDebuggerStore();
  const { getIssuedFormattedData, getPresentedFormattedData } =
    useValidateResult();

  const initialData = useMemo(() => {
    const {
      presentationHeader: initPresentationHeader,
      payloads: presentationPayload,
      issuerHeader: initIssuerHeader,
    } = getPresentedFormattedData();
    const { payloads: initPayloads } = getIssuedFormattedData();

    const claims = initPayloads.map((item) => item.claim);
    const decoded = initPayloads.map((item) => {
      const value = item.decoded;
      if (value.startsWith('"') && value.endsWith('"')) {
        return value.slice(1, -1);
      }
      return value;
    });
    const disclosed = presentationPayload.map((item) => item.decoded !== "");

    console.log(JSON.stringify(decoded, null, 2));
    return {
      initPresentationHeader,
      initIssuerHeader,
      payloadData: {
        claims,
        decodedString: JSON.stringify(decoded, null, 2),
        disclosed,
      },
    };
  }, [getPresentedFormattedData, getIssuedFormattedData]);

  const [issuerHeader, setIssuerHeader] = useState(
    initialData.initIssuerHeader,
  );
  const [presentationHeader, setPresentationHeader] = useState(
    initialData.initPresentationHeader,
  );
  const [payloads, setPayloads] = useState(initialData.payloadData);

  useMemo(() => {
    try {
      const decodedValues = JSON.parse(payloads.decodedString);
      const formattedPayloads = payloads.claims.map((claim, index) => ({
        claim,
        decoded:
          decodedValues[index] !== undefined
            ? typeof decodedValues[index] === "object"
              ? JSON.stringify(decodedValues[index])
              : String(decodedValues[index])
            : "",
      }));
      const undisclosedClaims = payloads.claims.filter(
        (_, index) => !payloads.disclosed[index],
      );
      const result = generateIssuedAndPresentedJWP(
        formattedPayloads,
        presentationHeader,
        undisclosedClaims,
        jwk,
      );
      setIssuedFormJWP(result.issued);
      setPresentedFormJWP(result.presented);
    } catch (error) {
      console.error("JWP Generation Error:", error);
    }
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
