import { checkJWK } from "@/libs/verify/checkJWK";
import { verifyIssuedJwp, verifyPresentedJwp } from "@/libs/verify/verifyJWP";
import { useDebuggerStore } from "@/store/context";

export const useVerifyResult = () => {
  const { jwk, issuedFormJWP, presentedFormJWP } = useDebuggerStore();

  const isValidJWK = jwk ? checkJWK(jwk) : false;

  const verifyIssuedJWPResult = () => {
    if (!isValidJWK || !jwk || !issuedFormJWP) {
      return {
        isVerified: false,
        verificationError: !isValidJWK
          ? "Invalid JWK format"
          : !jwk
            ? "No JWK provided"
            : "No issued JWP provided",
      };
    }

    try {
      const verificationResult = verifyIssuedJwp(jwk, issuedFormJWP);

      return {
        isVerified: verificationResult.verified,
        verificationError: verificationResult.verified
          ? undefined
          : `Verification failed: ${verificationResult.message}`,
      };
    } catch (error) {
      return {
        isVerified: false,
        verificationError: `Verification error: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  };

  // Verify presented JWP
  const verifyPresentedJWPResult = () => {
    if (!isValidJWK || !jwk || !presentedFormJWP) {
      return {
        isVerified: false,
        verificationError: !isValidJWK
          ? "Invalid JWK format"
          : !jwk
            ? "No JWK provided"
            : "No presented JWP provided",
      };
    }

    try {
      const verificationResult = verifyPresentedJwp(jwk, presentedFormJWP);

      return {
        isVerified: verificationResult.verified,
        verificationError: verificationResult.verified
          ? undefined
          : `Verification failed: ${verificationResult.message}`,
      };
    } catch (error) {
      return {
        isVerified: false,
        verificationError: `Verification error: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  };

  const getIssuedVerificationData = () => {
    if (!jwk) {
      return {
        isJwkValid: false,
        jwkError: "No JWK provided",
        isVerified: false,
        verificationError: "No JWK provided",
      };
    }

    const jwkValidation = {
      isJwkValid: isValidJWK,
      jwkError: isValidJWK ? undefined : "Invalid JWK format",
    };

    const verificationResult = verifyIssuedJWPResult();

    return {
      ...jwkValidation,
      ...verificationResult,
    };
  };

  const getPresentedVerificationData = () => {
    if (!jwk) {
      return {
        isJwkValid: false,
        jwkError: "No JWK provided",
        isVerified: false,
        verificationError: "No JWK provided",
      };
    }

    const jwkValidation = {
      isJwkValid: isValidJWK,
      jwkError: isValidJWK ? undefined : "Invalid JWK format",
    };

    const verificationResult = verifyPresentedJWPResult();

    return {
      ...jwkValidation,
      ...verificationResult,
    };
  };

  return {
    isValidJWK,
    getIssuedVerificationData,
    getPresentedVerificationData,
  };
};
