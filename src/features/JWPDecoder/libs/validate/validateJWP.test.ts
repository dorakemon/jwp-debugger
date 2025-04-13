import { describe, expect, it } from "vitest";
import { validateIssuedForm, validatePresentedForm } from "./validateJWP";

describe("validateJWP", () => {
  // Valid JWP token samples
  const validIssuedJwp =
    "eyJ0eXAiOiJKUFQiLCJhbGciOiJCQlMiLCJjbGFpbXMiOlsiaXNzIiwidmMuZGVncmVlLnR5cGUiLCJ2Yy5kZWdyZWUubmFtZSIsInZjLmRlZ3JlZS5jaWFvWzBdLnUxIiwidmMuZGVncmVlLmNpYW9bMV0udTIiLCJ2Yy5uYW1lIl19.Imh0dHBzOi8vaXNzdWVyLmV4YW1wbGUi~IkJhY2hlbG9yRGVncmVlIg~IkJhY2hlbG9yIG9mIFNjaWVuY2UgYW5kIEFydHMi~InZhbHVlMSI~InZhbHVlMiI~IkpvaG4gRG9lIg.jW87eAnoWbmwE5qmq8CS4XZgj2QQ8hqRYcaykL7GrRDplZiyoZPoIN3has9NW4P_A0TWISuyByu499izWLjLo0lvitMLbDfQdfX3QfxFp2o";

  const validPresentedJwp =
    "eyJ0eXAiOiJKUFQiLCJhbGciOiJCQlMiLCJjbGFpbXMiOlsiaXNzIiwidmMuZGVncmVlLnR5cGUiLCJ2Yy5kZWdyZWUubmFtZSIsInZjLmRlZ3JlZS5jaWFvWzBdLnUxIiwidmMuZGVncmVlLmNpYW9bMV0udTIiLCJ2Yy5uYW1lIl19.eyJhbGciOiJCQlMiLCJhdWQiOiJodHRwczovL3JlY2lwaWVudC5leGFtcGxlLmNvbSIsIm5vbmNlIjoid3JtQlJrS3RYalEifQ.Imh0dHBzOi8vaXNzdWVyLmV4YW1wbGUi~IkJhY2hlbG9yRGVncmVlIg~~~InZhbHVlMiI~.he9c2ZqOcx5nrr_l3F-S1f4ErP70mev6dLSoy8clFVnIqswsU4KEvqdUoaYMWMSRoq4-s7obTZiTj5UL3eNz1Y1Dn9Qqnm0UZquLJ4zZh2us5ci3QvaAgFiEZ6KR_uUFr_fuCS7UErhJ0HXwOgHktHkZD5S1YAYkLwJ6joc25YwsOOJYHrHQf9aCC_Kh_7WMaSRvGhYZptCOwLXd5Pk2LDuFqjeQDSdeMV6KLDJ-SuAiYiMVpqS7lBKInVQLAAmkQgrPmw0N314hof48dSgd9xmLa1yCaJSwQ4ww-hLDDsGczD-gdDAKdiS7HcKcKlLea2TgOrJDq3RsbSHX8U5bLf9z15A4Jk-_Gro82F5TY7RMLKYvRCKoeCzaC7fA-4XfDM_KUIMuDWFXdKow8ks8hirf1PgFDadgHz4MrrODWoYUH_oKxZs7xn4mVVb459hiApW3IEf5DZQBH9xXS1BoM8Y4U3I1jNY4XPRBOlpX5CY";

  describe("Issued JWP validation", () => {
    it("should validate a properly formatted issued JWP token", () => {
      const result = validateIssuedForm(validIssuedJwp);

      // Verify basic structure
      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.type).toBe("issued");
        // Verify issuer header
        expect(result.parsedResult.issuerProtectedHeader).toBeDefined();
        expect(result.parsedResult.issuerProtectedHeader.typ).toBe("JPT");
        expect(result.parsedResult.issuerProtectedHeader.alg).toBe("BBS");
        expect(result.parsedResult.issuerProtectedHeader.claims).toBeInstanceOf(
          Array,
        );
        expect(result.parsedResult.issuerProtectedHeader.claims).toHaveLength(
          6,
        );

        // Verify payloads
        expect(result.parsedResult.payload).toHaveLength(6);

        // Verify specific claim values (removing quotes)
        const firstClaim = result.parsedResult.payload[0];
        expect(firstClaim.claim).toBe("iss");
        expect(firstClaim.decoded).toBe('"https://issuer.example"');

        const degreeClaim = result.parsedResult.payload[1];
        expect(degreeClaim.claim).toBe("vc.degree.type");
        expect(degreeClaim.decoded).toBe('"BachelorDegree"');

        // Verify proof existence
        expect(result.parsedResult.proof).toBeDefined();
      }
    });

    it("should reject issued JWP with invalid format", () => {
      const invalidJwp = "header.payload";
      const result = validateIssuedForm(invalidJwp);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.message).toContain("Invalid JWP format");
      }
    });
  });

  describe("Presented JWP validation", () => {
    it("should validate a properly formatted presented JWP token", () => {
      const result = validatePresentedForm(validPresentedJwp);
      expect(result.success).toBe(true);

      if (result.success && result.type === "presented") {
        expect(result.type).toBe("presented");
        // Verify presentation header
        expect(result.parsedResult.presentationProtectedHeader).toBeDefined();
        expect(result.parsedResult.presentationProtectedHeader.alg).toBe("BBS");
        expect(result.parsedResult.presentationProtectedHeader.aud).toBe(
          "https://recipient.example.com",
        );
        expect(result.parsedResult.presentationProtectedHeader.nonce).toBe(
          "wrmBRkKtXjQ",
        );

        // Verify issuer header
        expect(result.parsedResult.issuerProtectedHeader).toBeDefined();
        expect(result.parsedResult.issuerProtectedHeader.typ).toBe("JPT");
        expect(result.parsedResult.issuerProtectedHeader.alg).toBe("BBS");
        expect(result.parsedResult.issuerProtectedHeader.claims).toBeInstanceOf(
          Array,
        );

        // Verify payloads
        expect(result.parsedResult.payload).toHaveLength(6);

        // Verify disclosed values (removing quotes)
        expect(result.parsedResult.payload[0].decoded).toBe(
          '"https://issuer.example"',
        );
        expect(result.parsedResult.payload[1].decoded).toBe('"BachelorDegree"');

        // Verify undisclosed values
        expect(result.parsedResult.payload[2].decoded).toBe("");
        expect(result.parsedResult.payload[3].decoded).toBe("");

        // Verify proof existence
        expect(result.parsedResult.proof).toBeDefined();
      }
    });

    it("should reject presented JWP with invalid part count", () => {
      const invalidJwp = "header.payload.proof";
      const result = validatePresentedForm(invalidJwp);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.message).toContain("Invalid JWP format");
      }
    });
  });
});
