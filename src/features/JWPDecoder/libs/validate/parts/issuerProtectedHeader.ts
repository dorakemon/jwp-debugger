const SUPPORTED_ALGORITHMS = ["BBS"] as const;

/**
 * Validate the issued protected header
 */
export const validateIssuerProtectedHeader = (
  headerBase64: string,
): // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  | { success: true; header: Record<string, any> }
  | { success: false; message: string } => {
  try {
    const headerDecoded = atob(headerBase64);
    const header = JSON.parse(headerDecoded);

    // Validate algorithm
    if (header.alg && !SUPPORTED_ALGORITHMS.includes(header.alg)) {
      return {
        success: false,
        message: `Unsupported algorithm: ${header.alg}. Currently supported: ${SUPPORTED_ALGORITHMS.join(", ")}`,
      };
    }

    // For issued headers, claims must be an array
    if (!header.claims || !Array.isArray(header.claims)) {
      return {
        success: false,
        message: "Invalid Issuer Protected Header: claims must be an array",
      };
    }

    return { success: true, header };
  } catch (error) {
    return {
      success: false,
      message: `Invalid Issuer Protected Header: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
