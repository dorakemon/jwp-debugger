import { createContext, useContext, useState } from "react";

interface JwpDebuggerContextState {
  jwk: string;
  setJwk: React.Dispatch<React.SetStateAction<string>>;
  issuedFormJWP: string;
  setIssuedFormJWP: React.Dispatch<React.SetStateAction<string>>;
  presentedFormJWP: string;
  setPresentedFormJWP: React.Dispatch<React.SetStateAction<string>>;
}

const JwpDebuggerContext = createContext<JwpDebuggerContextState | undefined>(
  undefined,
);

interface DebuggerStoreProviderProps {
  children: React.ReactNode;
}

export const DebuggerStore: React.FC<DebuggerStoreProviderProps> = ({
  children,
}) => {
  const [jwk, setJwk] = useState<string>(
    JSON.stringify(
      {
        kty: "EC",
        crv: "BLS12381G2",
        x: "FBTfTNT7JiPtxE32futIRKd4Y1PW26e09M55IRQ0Wp9WqwP6Th03fDtgwc14zyWxBAEsX06vLQ9Huh4YavayvSZRPS_il2OCXqAqQAmijbFb39lstaMy5bPKzwXtC-G0",
        y: "DoS1pMjDSfJzmir0xdwq9-1cm705j7PZ-hOmRdoajzqkSQDen7mxDaVzxwuMFVVHEwkODf3IKaHnh1R59GqsVP9WPWfQ1ibDizjw-R5trpF2wF8FWeKCX9VSKmpf9nYI",
        d: "KCdtD0YLaXK0ZbyVaZ0Fd51HnL4uZVS2lrM1Q6G3iJ4",
      },
      null,
      2,
    ),
  );
  const [issuedFormJWP, setIssuedFormJWP] = useState<string>(
    "eyJ0eXAiOiJKUFQiLCJhbGciOiJCQlMiLCJjbGFpbXMiOlsiaXNzIiwidmMuZGVncmVlLnR5cGUiLCJ2Yy5kZWdyZWUubmFtZSIsInZjLmRlZ3JlZS5jaWFvWzBdLnUxIiwidmMuZGVncmVlLmNpYW9bMV0udTIiLCJ2Yy5uYW1lIl19.Imh0dHBzOi8vaXNzdWVyLmV4YW1wbGUi~IkJhY2hlbG9yRGVncmVlIg~IkJhY2hlbG9yIG9mIFNjaWVuY2UgYW5kIEFydHMi~InZhbHVlMSI~InZhbHVlMiI~IkpvaG4gRG9lIg.jW87eAnoWbmwE5qmq8CS4XZgj2QQ8hqRYcaykL7GrRDplZiyoZPoIN3has9NW4P_A0TWISuyByu499izWLjLo0lvitMLbDfQdfX3QfxFp2o",
  );
  const [presentedFormJWP, setPresentedFormJWP] = useState<string>(
    "eyJ0eXAiOiJKUFQiLCJhbGciOiJCQlMiLCJjbGFpbXMiOlsiaXNzIiwidmMuZGVncmVlLnR5cGUiLCJ2Yy5kZWdyZWUubmFtZSIsInZjLmRlZ3JlZS5jaWFvWzBdLnUxIiwidmMuZGVncmVlLmNpYW9bMV0udTIiLCJ2Yy5uYW1lIl19.eyJhbGciOiJCQlMiLCJhdWQiOiJodHRwczovL3JlY2lwaWVudC5leGFtcGxlLmNvbSIsIm5vbmNlIjoid3JtQlJrS3RYalEifQ.Imh0dHBzOi8vaXNzdWVyLmV4YW1wbGUi~IkJhY2hlbG9yRGVncmVlIg~~~InZhbHVlMiI~.he9c2ZqOcx5nrr_l3F-S1f4ErP70mev6dLSoy8clFVnIqswsU4KEvqdUoaYMWMSRoq4-s7obTZiTj5UL3eNz1Y1Dn9Qqnm0UZquLJ4zZh2us5ci3QvaAgFiEZ6KR_uUFr_fuCS7UErhJ0HXwOgHktHkZD5S1YAYkLwJ6joc25YwsOOJYHrHQf9aCC_Kh_7WMaSRvGhYZptCOwLXd5Pk2LDuFqjeQDSdeMV6KLDJ-SuAiYiMVpqS7lBKInVQLAAmkQgrPmw0N314hof48dSgd9xmLa1yCaJSwQ4ww-hLDDsGczD-gdDAKdiS7HcKcKlLea2TgOrJDq3RsbSHX8U5bLf9z15A4Jk-_Gro82F5TY7RMLKYvRCKoeCzaC7fA-4XfDM_KUIMuDWFXdKow8ks8hirf1PgFDadgHz4MrrODWoYUH_oKxZs7xn4mVVb459hiApW3IEf5DZQBH9xXS1BoM8Y4U3I1jNY4XPRBOlpX5CY",
  );
  const value = {
    jwk,
    setJwk,
    issuedFormJWP,
    setIssuedFormJWP,
    presentedFormJWP,
    setPresentedFormJWP,
  };
  return (
    <JwpDebuggerContext.Provider value={value}>
      {children}
    </JwpDebuggerContext.Provider>
  );
};

export const useDebuggerStore = (): JwpDebuggerContextState => {
  const context = useContext(JwpDebuggerContext);
  if (context === undefined) {
    throw new Error("useDebuggerStore must be used within a DebuggerStore");
  }
  return context;
};
