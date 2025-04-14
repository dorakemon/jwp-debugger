import { useState } from "react";
import { DebuggerDescription, DebuggerHeader } from "./components/Debugger";
import { Header } from "./components/Layout";
import { JWPDecoder } from "./features/JWPDecoder";
import { cn } from "./libs/tailwindUtils";
import { DebuggerStore } from "./store/context";

const App = () => {
  const [activeTab, setActiveTab] = useState<"decoder" | "encoder">("decoder");

  return (
    <DebuggerStore>
      <div className="min-h-screen bg-white text-gray-800 antialiased">
        <Header />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <DebuggerHeader />
          <DebuggerDescription />
          <div className="mb-2 flex border-b">
            <button
              className={cn(
                "px-4 py-2 font-bold text-gray-400 text-lg",
                activeTab === "decoder" && "border-black border-b-2 text-black",
              )}
              onClick={() => setActiveTab("decoder")}
            >
              JWP Decoder
            </button>
            <button
              className={cn(
                "px-4 py-2 font-bold text-gray-400 text-lg",
                activeTab === "encoder" && "border-black border-b-2 text-black",
              )}
              onClick={() => setActiveTab("encoder")}
            >
              JWP Encoder
            </button>
          </div>
          {activeTab === "decoder" && <JWPDecoder />}
        </div>
      </div>
    </DebuggerStore>
  );
};

export default App;
