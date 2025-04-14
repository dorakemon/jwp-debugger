import {
  IssuedJwp,
  Jwk,
  JwpProofAlgorithm,
  JwpSerializationType,
  PresentedJwp,
  SupportedKeyType,
} from "json-proof-token-js";
import { verifyIssuedJwp, verifyPresentedJwp } from "./verifyJWP";

describe("verifyJWP", () => {
  const jwk = Jwk.generate(SupportedKeyType.BLS12381G2);
  const publicJwk = jwk.to_public();
  const publicJwkString = publicJwk.to_json();

  afterAll(() => {
    jwk.free();
    publicJwk.free();
  });

  it("should verify a valid issued/presented JWP successfully", () => {
    const jwp = new IssuedJwp(
      jwk,
      JwpProofAlgorithm.Bbs,
      "https://example.com/issuer",
      JSON.stringify({ name: "John Dow", age: "20" }),
    );
    const jwpString = jwp.encode(JwpSerializationType.Compact);

    const result = verifyIssuedJwp(publicJwkString, jwpString);
    expect(result.verified).toBe(true);
    expect(result.message).toBeUndefined();

    const presentedJwp = new PresentedJwp(
      jwk,
      jwp,
      ["name"],
      "https://example.com/issuer",
      "dummy-nonce",
    );
    const presentedJwpString = presentedJwp.encode(
      JwpSerializationType.Compact,
    );
    const presentedResult = verifyPresentedJwp(
      publicJwkString,
      presentedJwpString,
    );
    expect(presentedResult.verified).toBe(true);
    expect(presentedResult.message).toBeUndefined();
  });
});
