import { validateIssuedForm, validatePresentedForm } from "@/libs/validate";
import { useDebuggerStore } from "@/store/context";

export const useValidateResult = () => {
  const { issuedFormJWP, presentedFormJWP } = useDebuggerStore();

  const issuedFormJWPValidateResult = validateIssuedForm(issuedFormJWP);
  const presentedFormJWPValidateResult =
    validatePresentedForm(presentedFormJWP);

  const getIssuedFormattedData = (): {
    isValid: boolean;
    validationError: string;
    issuerHeader: string;
    payloads: {
      raw: string;
      decoded: string;
      claim: string;
    }[];
  } => {
    if (!issuedFormJWPValidateResult.success)
      return {
        isValid: false,
        validationError: issuedFormJWPValidateResult.message,
        issuerHeader: "",
        payloads: [],
      };

    return {
      isValid: true,
      validationError: "",
      issuerHeader: JSON.stringify(
        issuedFormJWPValidateResult.parsedResult.issuerProtectedHeader,
        null,
        2,
      ),
      payloads: issuedFormJWPValidateResult.parsedResult.payload,
    };
  };

  const getPresentedFormattedData = (): {
    isValid: boolean;
    validationError: string;
    issuerHeader: string;
    presentationHeader: string;
    payloads: {
      raw: string;
      decoded: string;
      claim: string;
    }[];
  } => {
    if (!presentedFormJWPValidateResult.success)
      return {
        isValid: false,
        validationError: presentedFormJWPValidateResult.message,
        issuerHeader: "",
        presentationHeader: "",
        payloads: [],
      };

    return {
      isValid: true,
      validationError: "",
      issuerHeader: JSON.stringify(
        presentedFormJWPValidateResult.parsedResult.issuerProtectedHeader,
        null,
        2,
      ),
      presentationHeader: JSON.stringify(
        presentedFormJWPValidateResult.parsedResult.presentationProtectedHeader,
        null,
        2,
      ),
      payloads: presentedFormJWPValidateResult.parsedResult.payload,
    };
  };

  return {
    issuedFormJWPValidateResult,
    presentedFormJWPValidateResult,
    getIssuedFormattedData,
    getPresentedFormattedData,
  };
};
