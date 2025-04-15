import { Jwk, SupportedKeyType } from "json-proof-token-js";
import { generateIssuedAndPresentedJWP } from "./generateJWP";

describe("verifyJWP", () => {
  const jwk = Jwk.generate(SupportedKeyType.BLS12381G2);

  afterAll(() => {
    jwk.free();
  });

  it("should generate valid issued/presented JWPs successfully", () => {
    const payload = [
      { claim: "iss", decoded: "https://example.com/issuer" },
      { claim: "name", decoded: "John Dow" },
      { claim: "age", decoded: "20" },
    ];
    const presentationProtectedHeaderString = JSON.stringify({
      alg: "BBS",
      aud: "https://example.com/audience",
      nonce: "dummy-nonce",
    });
    const disclosedClaims = ["name"];
    const { issued, presented } = generateIssuedAndPresentedJWP(
      payload,
      presentationProtectedHeaderString,
      disclosedClaims,
      jwk.to_json(),
    );
    expect(issued).toBeDefined();
    expect(presented).toBeDefined();
  });
});
