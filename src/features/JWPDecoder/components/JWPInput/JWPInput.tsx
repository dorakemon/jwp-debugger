import { CardWithTabsTitle, CardWithTextTitle } from "@/components/Card";
import { BaseTextarea } from "@/components/JWPVisualizer/BaseTextarea";
import { IssuedOrPresentedTabs } from "../../constants";

type JWPInputProps = {
  isMobile: boolean;
  issuedOrPresented: keyof typeof IssuedOrPresentedTabs;
  handleSelectIssuedOrPresented: (
    value: keyof typeof IssuedOrPresentedTabs,
  ) => void;
};

export const JWPInput = ({
  isMobile,
  issuedOrPresented,
  handleSelectIssuedOrPresented,
}: JWPInputProps) => {
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
              <BaseTextarea />
            </CardWithTextTitle>
            <CardWithTextTitle
              title={IssuedOrPresentedTabs.presented}
              isActive={issuedOrPresented === "presented"}
              onClick={() => {
                handleSelectIssuedOrPresented("presented");
              }}
            >
              <BaseTextarea />
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
            <span>This is the content for the selected tab.</span>
          </CardWithTabsTitle>
        )}
      </div>
    </div>
  );
};
