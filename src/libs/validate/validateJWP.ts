import { validatePayload, validatePresentationProtectedHeader } from "./parts";
import { validateIssuerProtectedHeader } from "./parts/issuerProtectedHeader";

type ParsedFullResult = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  presentationProtectedHeader: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  issuerProtectedHeader: Record<string, any>;
  payload: {
    raw: string;
    decoded: string;
    claim: string;
  }[];
  proof: string;
};

export type IssuedFormJWPResult =
  | {
      success: true;
      type: "issued";
      parsedResult: Omit<ParsedFullResult, "presentationProtectedHeader">;
    }
  | { success: false; message: string };

export type PresentedFormJWPResult =
  | {
      success: true;
      type: "presented";
      parsedResult: ParsedFullResult;
    }
  | { success: false; message: string };

/**
 * Validate IssuedForm JWP
 */
export const validateIssuedForm = (jwp: string): IssuedFormJWPResult => {
  const parts = jwp.split(".");

  // Check if the JWP has the correct number of parts
  if (parts.length !== 3) {
    return {
      success: false,
      message: "Invalid JWP format: Expected three parts separated by dots",
    };
  }

  const [headerBase64, payloadBase64, proof] = parts;

  // Validate issued header
  const headerResult = validateIssuerProtectedHeader(headerBase64);
  if (!headerResult.success) {
    return { success: false, message: headerResult.message };
  }

  // Validate payload
  const payloadResult = validatePayload(
    payloadBase64,
    headerResult.header.claims,
  );
  if (!payloadResult.success) {
    return { success: false, message: payloadResult.message };
  }

  return {
    success: true,
    type: "issued",
    parsedResult: {
      issuerProtectedHeader: headerResult.header,
      payload: payloadResult.payloads,
      proof,
    },
  };
};

/**
 * Validate PresentedForm JWP
 */
export const validatePresentedForm = (jwp: string): PresentedFormJWPResult => {
  const parts = jwp.split(".");

  // Check if the JWP has the correct number of parts
  if (parts.length !== 4) {
    return {
      success: false,
      message: "Invalid JWP format: Expected four parts separated by dots",
    };
  }

  const [issuedHeaderBase64, presentHeaderBase64, payloadBase64, proof] = parts;

  // Validate presentation header
  const presentHeaderResult =
    validatePresentationProtectedHeader(presentHeaderBase64);
  if (!presentHeaderResult.success) {
    return {
      success: false,
      message: presentHeaderResult.message,
    };
  }

  // Validate issued header
  const issuedHeaderResult = validateIssuerProtectedHeader(issuedHeaderBase64);
  if (!issuedHeaderResult.success) {
    return {
      success: false,
      message: issuedHeaderResult.message,
    };
  }

  // Validate payload
  const payloadResult = validatePayload(
    payloadBase64,
    issuedHeaderResult.header.claims,
  );
  if (!payloadResult.success) {
    return { success: false, message: payloadResult.message };
  }

  // Validation successful
  return {
    success: true,
    type: "presented",
    parsedResult: {
      presentationProtectedHeader: presentHeaderResult.header,
      issuerProtectedHeader: issuedHeaderResult.header,
      payload: payloadResult.payloads,
      proof,
    },
  };
};
