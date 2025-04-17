import {
  IssuedJwp,
  Jwk,
  JwpProofAlgorithm,
  JwpSerializationType,
  PresentedJwp,
} from "json-proof-token-js";

export const generateIssuedAndPresentedJWP = (
  payload: Array<{ claim: string; decoded: string }>,
  presentationProtectedHeaderString: string,
  undisclosedClaims: string[],
  jwkString: string,
) => {
  const jwk = new Jwk(jwkString);
  const publicJwk = jwk.to_public();
  const iss = payload.find((item) => item.claim === "iss")?.decoded ?? "";
  const claims: Record<string, string> = {};
  for (const item of payload) {
    if (item.claim !== "iss") {
      claims[item.claim] = item.decoded;
    }
  }
  const jwp = new IssuedJwp(
    jwk,
    JwpProofAlgorithm.Bbs,
    iss,
    JSON.stringify(claims),
  );
  const jwpString = jwp.encode(JwpSerializationType.Compact);

  const presentationProtectedHeader = JSON.parse(
    presentationProtectedHeaderString,
  );
  const aud: string = presentationProtectedHeader.aud || "";
  const nonce: string = presentationProtectedHeader.nonce || "";
  const presentedJwp = new PresentedJwp(
    publicJwk,
    jwp,
    undisclosedClaims,
    aud,
    nonce,
  );
  const presentedJwpString = presentedJwp.encode(JwpSerializationType.Compact);

  jwk.free();
  publicJwk.free();
  jwp.free();
  presentedJwp.free();

  return {
    issued: jwpString,
    presented: presentedJwpString,
  };
};
