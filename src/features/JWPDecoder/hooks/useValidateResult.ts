import { useDebuggerStore } from "@/store/context";
import { validateIssuedForm, validatePresentedForm } from "../libs/validate";

export const useValidateResult = () => {
  const { issuedFormJWP, presentedFormJWP } = useDebuggerStore();

  const issuedFormJWPValidateResult = validateIssuedForm(issuedFormJWP);
  const presentedFormJWPValidateResult =
    validatePresentedForm(presentedFormJWP);

  const getIssuedFormattedData = () => {
    if (!issuedFormJWPValidateResult.success)
      return {
        isValid: false,
        validationError: issuedFormJWPValidateResult.message,
        header: "",
        payloads: "",
      };

    return {
      isValid: true,
      validationError: "",
      header: JSON.stringify(
        issuedFormJWPValidateResult.parsedResult.issuerProtectedHeader,
        null,
        2,
      ),
      payloads: JSON.stringify(
        issuedFormJWPValidateResult.parsedResult.payload.map(
          (value) => value.decoded,
        ),
        null,
        2,
      ),
    };
  };

  const getPresentedFormattedData = () => {
    if (!presentedFormJWPValidateResult.success)
      return {
        isValid: false,
        validationError: presentedFormJWPValidateResult.message,
        issuerHeader: "",
        presentationHeader: "",
        payloads: "",
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
      payloads: JSON.stringify(
        presentedFormJWPValidateResult.parsedResult.payload.map(
          (value) => value.decoded,
        ),
        null,
        2,
      ),
    };
  };

  return {
    issuedFormJWPValidateResult,
    presentedFormJWPValidateResult,
    getIssuedFormattedData,
    getPresentedFormattedData,
  };
};
