import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-center p-4">
      <Compass className="h-24 w-24 text-primary mb-6 animate-pulse" />
      <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-widest mb-4">
        404
      </h1>
      <h2 className="text-xl md:text-2xl text-primary font-bold uppercase tracking-[0.2em] mb-8">
        Lost in the Safari?
      </h2>
      <p className="text-gray-400 max-w-md mb-8">
        The page you are looking for seems to have wandered off into the wild.
        Let's get you back to the camp.
      </p>
      <Link 
        href="/"
        className="btn-primary inline-flex items-center gap-2"
      >
        Return Home
      </Link>
    </div>
  );
}
