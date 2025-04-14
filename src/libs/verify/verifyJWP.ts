import {
  IssuedJwp,
  Jwk,
  JwpSerializationType,
  PresentedJwp,
} from "json-proof-token-js";

export type VerifyResult = { verified: boolean; message?: string };

export const verifyIssuedJwp = (jwk: string, jwp: string): VerifyResult => {
  try {
    const jwkInstance = new Jwk(jwk);
    const publicJwkInstance = jwkInstance.to_public();
    const result = IssuedJwp.verify(
      publicJwkInstance,
      JwpSerializationType.Compact,
      jwp,
    );
    jwkInstance.free();
    publicJwkInstance.free();
    return { verified: result };
  } catch (error) {
    return { verified: false, message: String(error) };
  }
};

export const verifyPresentedJwp = (jwk: string, jwp: string): VerifyResult => {
  try {
    const jwkInstance = new Jwk(jwk);
    const publicJwkInstance = jwkInstance.to_public();
    const result = PresentedJwp.verify(
      publicJwkInstance,
      JwpSerializationType.Compact,
      jwp,
    );
    jwkInstance.free();
    publicJwkInstance.free();
    return { verified: result };
  } catch (error) {
    return { verified: false, message: String(error) };
  }
};
