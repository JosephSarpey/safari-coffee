import { CoffeeIcon } from "lucide-react";

export default function Loading() {
  return (
    <div>
      <div className="fixed inset-0 bg-zinc-950 z-[9999] flex flex-col items-center justify-center">
        <div className="relative">
          {/* Spinner */}
          <div className="h-20 w-20 rounded-full border-4 border-zinc-800 border-t-primary animate-spin" />
          
          {/* Inner Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl"><CoffeeIcon /></span>
          </div>
        </div>
        <p className="mt-8 text-white uppercase tracking-[0.2em] text-sm animate-pulse">
          Brewing...
        </p>
      </div>
    </div>
  );
}
