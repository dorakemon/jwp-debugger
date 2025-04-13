import { useState } from "react";

export const useSelectIssuedOrPresented = () => {
  const [issuedOrPresented, setIssuedOrPresented] = useState<
    "issued" | "presented"
  >("issued");
  const handleSelectIssuedOrPresented = (value: "issued" | "presented") => {
    setIssuedOrPresented(value);
  };
  return { issuedOrPresented, handleSelectIssuedOrPresented };
};
