import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { DebuggerDescription, DebuggerHeader } from "./components/Debugger";
import { Header } from "./components/Layout";
import { JWPDecoder } from "./features/JWPDecoder";
import { cn } from "./libs/tailwindUtils";

const App = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"decoder" | "encoder">("decoder");

  return (
    <div className="bg-white text-gray-800 min-h-screen antialiased">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DebuggerHeader />
        <DebuggerDescription />
        <div className="flex mb-2 border-b">
          <button
            className={cn(
              "py-2 px-4 font-bold text-lg",
              "rounded-none outline-none focus:outline-none",
              activeTab === "decoder" && "border-b-2 border-black",
            )}
            onClick={() => setActiveTab("decoder")}
          >
            JWP Decoder
          </button>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "py-2 px-4 font-bold text-lg text-gray-400",
                  "rounded-none outline-none focus:outline-none",
                  activeTab === "encoder" && "border-b-2 border-black",
                )}
              >
                JWP Encoder
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <p className="text-red-700 font-medium">
                    This feature is not implemented yet
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {activeTab === "decoder" && <JWPDecoder />}
      </div>
    </div>
  );
};

export default App;
