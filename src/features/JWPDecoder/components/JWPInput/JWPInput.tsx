import { CardWithTabsTitle, CardWithTextTitle } from "@/components/Card";
import { BaseTextarea } from "@/components/JWPVisualizer/BaseTextarea";
import { StatusBanner } from "@/components/StatusBanner";
import { useDebuggerStore } from "@/store/context";
import { useMemo } from "react";
import { IssuedOrPresentedTabs } from "../../constants";

type JWPInputProps = {
  isMobile: boolean;
  issuedOrPresented: keyof typeof IssuedOrPresentedTabs;
  handleSelectIssuedOrPresented: (
    value: keyof typeof IssuedOrPresentedTabs,
  ) => void;
  isseuedFormStatus: {
    isValid: boolean;
    validationError?: string;
    isVerified: boolean;
    verificationError?: string;
  };
  presentedFormStatus: {
    isValid: boolean;
    validationError?: string;
    isVerified: boolean;
    verificationError?: string;
  };
};

export const JWPInput = ({
  isMobile,
  issuedOrPresented,
  handleSelectIssuedOrPresented,
  isseuedFormStatus,
  presentedFormStatus,
}: JWPInputProps) => {
  const {
    issuedFormJWP,
    setIssuedFormJWP,
    presentedFormJWP,
    setPresentedFormJWP,
  } = useDebuggerStore();
  const IssuedJwpStatusBanners = useMemo(() => {
    return (
      <>
        <StatusBanner status={isseuedFormStatus.isValid ? "success" : "error"}>
          {isseuedFormStatus.isValid
            ? "Valid JWP"
            : isseuedFormStatus.validationError}
        </StatusBanner>
        <StatusBanner
          status={isseuedFormStatus.isVerified ? "success" : "error"}
        >
          {isseuedFormStatus.isVerified
            ? "Proof Verified"
            : isseuedFormStatus.verificationError}
        </StatusBanner>
      </>
    );
  }, [isseuedFormStatus]);

  const PresentedJwpStatusBanners = useMemo(() => {
    return (
      <>
        <StatusBanner
          status={presentedFormStatus.isValid ? "success" : "error"}
        >
          {presentedFormStatus.isValid
            ? "Valid JWP"
            : presentedFormStatus.validationError}
        </StatusBanner>
        <StatusBanner
          status={presentedFormStatus.isVerified ? "success" : "error"}
        >
          {presentedFormStatus.isVerified
            ? "Proof Verified"
            : presentedFormStatus.verificationError}
        </StatusBanner>
      </>
    );
  }, [presentedFormStatus]);

  return (
    <div>
      <div className="text-sm font-medium mb-2">ENCODED JWP</div>
      <div className="flex flex-col space-y-4">
        {!isMobile ? (
          <>
            <CardWithTextTitle
              title={IssuedOrPresentedTabs.issued}
              isActive={issuedOrPresented === "issued"}
              onClick={() => {
                handleSelectIssuedOrPresented("issued");
              }}
            >
              {IssuedJwpStatusBanners}
              <BaseTextarea onChange={setIssuedFormJWP}>
                {issuedFormJWP}
              </BaseTextarea>
            </CardWithTextTitle>
            <CardWithTextTitle
              title={IssuedOrPresentedTabs.presented}
              isActive={issuedOrPresented === "presented"}
              onClick={() => {
                handleSelectIssuedOrPresented("presented");
              }}
            >
              {PresentedJwpStatusBanners}
              <BaseTextarea onChange={setPresentedFormJWP}>
                {presentedFormJWP}
              </BaseTextarea>
            </CardWithTextTitle>
          </>
        ) : (
          <CardWithTabsTitle
            activeTabKey={issuedOrPresented}
            tabTitles={IssuedOrPresentedTabs}
            onTabClick={(tabTitle) => {
              handleSelectIssuedOrPresented(
                tabTitle as keyof typeof IssuedOrPresentedTabs,
              );
            }}
          >
            {issuedOrPresented === "issued" ? (
              <>
                {IssuedJwpStatusBanners}
                <BaseTextarea onChange={setIssuedFormJWP} key="issued">
                  {issuedFormJWP}
                </BaseTextarea>
              </>
            ) : (
              <>
                {PresentedJwpStatusBanners}
                <BaseTextarea onChange={setPresentedFormJWP} key="presented">
                  {presentedFormJWP}
                </BaseTextarea>
              </>
            )}
          </CardWithTabsTitle>
        )}
      </div>
    </div>
  );
};
