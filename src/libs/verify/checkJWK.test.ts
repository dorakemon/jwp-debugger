import { checkJWK } from "./checkJWK";

describe("checkJWK", () => {
  it("should return true for valid JWK", () => {
    const sampleJwk = {
      kty: "EC",
      crv: "BLS12381G2",
      x: "FBTfTNT7JiPtxE32futIRKd4Y1PW26e09M55IRQ0Wp9WqwP6Th03fDtgwc14zyWxBAEsX06vLQ9Huh4YavayvSZRPS_il2OCXqAqQAmijbFb39lstaMy5bPKzwXtC-G0",
      y: "DoS1pMjDSfJzmir0xdwq9-1cm705j7PZ-hOmRdoajzqkSQDen7mxDaVzxwuMFVVHEwkODf3IKaHnh1R59GqsVP9WPWfQ1ibDizjw-R5trpF2wF8FWeKCX9VSKmpf9nYI",
      d: "KCdtD0YLaXK0ZbyVaZ0Fd51HnL4uZVS2lrM1Q6G3iJ4",
    };
    const result = checkJWK(JSON.stringify(sampleJwk));
    expect(result).toBe(true);
  });

  it("should return false for invalid JWK", () => {
    const invalidJWK = {
      kty: "EC",
      crv: "BLS12381G2",
      noX: "invalid_x_value",
      y: "invalid_y_value",
      d: "invalid_d_value",
    };
    const result = checkJWK(JSON.stringify(invalidJWK));
    expect(result).toBe(false);
  });
});
