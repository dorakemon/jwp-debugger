/**
 * Validate and process payload
 */
export const validatePayload = (
  payloadBase64: string,
  claims: string[],
):
  | {
      success: true;
      payloads: Array<{ raw: string; decoded: string; claim: string }>;
    }
  | { success: false; message: string } => {
  const payloadParts = payloadBase64.split("~");

  // Check if the number of payload parts matches the number of claims
  if (payloadParts.length !== claims.length) {
    return {
      success: false,
      message: `Payload parts count (${payloadParts.length}) does not match claims count (${claims.length})`,
    };
  }

  // Process each payload part
  const payloads = payloadParts.map((part, index) => {
    try {
      const decoded = part ? atob(part) : "";
      return {
        raw: part,
        decoded,
        claim: claims[index],
      };
    } catch {
      // Return raw value if decoding fails
      return {
        raw: part,
        decoded: part,
        claim: claims[index],
      };
    }
  });
  return {
    success: true,
    payloads,
  };
};
