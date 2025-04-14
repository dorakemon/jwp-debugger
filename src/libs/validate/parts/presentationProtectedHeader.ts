const SUPPORTED_ALGORITHMS = ["BBS"] as const;

/**
 * Validate the presentation protected header
 */
export const validatePresentationProtectedHeader = (
  headerBase64: string,
): // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  | { success: true; header: Record<string, any> }
  | { success: false; message: string } => {
  try {
    const headerDecoded = atob(headerBase64);
    const header = JSON.parse(headerDecoded);

    if (header.alg && !SUPPORTED_ALGORITHMS.includes(header.alg)) {
      return {
        success: false,
        message: `Unsupported algorithm: ${header.alg}. Currently supported: ${SUPPORTED_ALGORITHMS.join(", ")}`,
      };
    }
    if (!header.aud) {
      return {
        success: false,
        message:
          "Invalid Presentation Protected Header: 'aud' claim is required",
      };
    }
    if (!header.nonce) {
      return {
        success: false,
        message:
          "Invalid Presentation Protected Header: 'nonce' claim is required",
      };
    }

    return { success: true, header };
  } catch (error) {
    return {
      success: false,
      message: `Invalid Presentation Protected Header: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
