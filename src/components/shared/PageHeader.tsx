import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
  return (
    <div className="relative pt-40 pb-20 overflow-hidden text-center">
      <Image
        src={backgroundImage || "/images/bg_3.jpg"}
        alt={title}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="container relative z-10 space-y-4">
        <h1 className="text-[40px] font-normal uppercase tracking-widest text-white leading-tight">
          {title}
        </h1>
        <div className="flex items-center justify-center space-x-2 text-[13px] uppercase tracking-widest">
          <Link href="/" className="text-white hover:text-primary transition-colors border-b-2 border-white/10">Home</Link>
          <span className="text-white/50">{subtitle || title}</span>
        </div>
      </div>
    </div>
  );
}
