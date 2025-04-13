import { validatePayload, validatePresentationProtectedHeader } from "./parts";
import { validateIssuerProtectedHeader } from "./parts/issuerProtectedHeader";

type ParsedFullResult = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  presentationProtectedHeader: Record<string, any>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  issuedProtectedHeader: Record<string, any>;
  issuedPayload: {
    raw: string;
    decoded: string;
    claim: string;
  }[];
  proof: string;
};

export type ValidateResult =
  | {
      success: true;
      type: "issued";
      parsedResult: Omit<ParsedFullResult, "presentationProtectedHeader">;
    }
  | {
      success: true;
      type: "presented";
      parsedResult: ParsedFullResult;
    }
  | { success: false; message: string };

/**
 * Validate JWP
 */
export const validateJWP = (
  type: "issued" | "presented",
  jwp: string,
): ValidateResult => {
  const parts = jwp.split(".");

  // Check if the JWP has the correct number of parts
  if (
    (type === "issued" && parts.length !== 3) ||
    (type === "presented" && parts.length !== 4)
  ) {
    return {
      success: false,
      message: `Invalid JWP format: Expected ${type === "issued" ? "three" : "four"} parts separated by dots`,
    };
  }

  return type === "issued"
    ? validateIssuedForm(parts)
    : validatePresentedForm(parts);
};

/**
 * Validate IssuedForm JWP
 */
const validateIssuedForm = (parts: string[]): ValidateResult => {
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
      issuedProtectedHeader: headerResult.header,
      issuedPayload: payloadResult.payloads,
      proof,
    },
  };
};

/**
 * Validate PresentedForm JWP
 */
const validatePresentedForm = (parts: string[]): ValidateResult => {
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
      issuedProtectedHeader: issuedHeaderResult.header,
      issuedPayload: payloadResult.payloads,
      proof,
    },
  };
};
