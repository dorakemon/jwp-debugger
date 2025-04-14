import { Jwk } from "json-proof-token-js";

export const checkJWK = (jwk: string): boolean => {
  try {
    const jwkInstance = new Jwk(jwk);
    jwkInstance.free();
    return true;
  } catch (error) {
    console.error("Invalid JWK format:", error);
    return false;
  }
};
