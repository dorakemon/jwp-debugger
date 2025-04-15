import { useIsMobile } from "@/hooks/useIsMobile";
import { EncoderInput } from "./Input";
import { JWPOutput } from "./JWPOutput";

export const JWPEncoder = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      <div className="mb-4 font-light16 text-sm">
        Fill in the fields below to generate JWPs.
      </div>
      <div
        className={`flex ${isMobile ? "flex-col space-y-6" : "flex-row space-x-6"} w-full`}
      >
        <div
          className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col space-y-4`}
        >
          <EncoderInput />
        </div>
        <div
          className={`${isMobile ? "w-full" : "w-1/2"} flex flex-col space-y-4`}
        >
          <JWPOutput />
        </div>
      </div>
    </div>
  );
};
