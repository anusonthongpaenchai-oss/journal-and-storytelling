import { Loader2 } from "lucide-react";

export function LoadingScreen() {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <Loader2 className="w-16 h-16 animate-spin text-foreground" />
          <p className="mt-4 text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }
