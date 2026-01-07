"use client";

import Link from "next/link";
import Image from "next/image";
import { Coffee, MapPin, Phone, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import Newsletter from "./Newsletter";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/account")) return null;

  return (
    <footer className="relative bg-black border-t border-primary/10 pt-16 pb-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer-bg.jpg"
          alt="Footer Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply" />
      </div>

      <div className="relative z-10">
        <Newsletter />
      </div>

      <div className="relative z-10 container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-gray-400">
        {/* Brand */}
            <div className="space-y-6">
              <Link href="/" className="flex flex-col">
                <span className="text-white text-2xl font-bold uppercase tracking-tight leading-none">
                  Safari
                </span>
                <span className="text-white/70 text-[10px] uppercase tracking-[0.4em] mt-1 leading-none">
                  Roast
                </span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
              </p>
          <div className="flex space-x-4">
            <Facebook className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            <Twitter className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
            <Instagram className="h-5 w-5 hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/menu" className="hover:text-primary transition-colors">Menu</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="/reservation" className="hover:text-primary transition-colors">Reservations</Link></li>
          </ul>
        </div>

        {/* Recent Blog/News placeholder */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold uppercase tracking-widest text-sm">Our Origin</h4>
          <p className="text-sm italic">"100% Organic Single-Origin Kenya Beans"</p>
          <div className="flex items-center space-x-2">
            <Coffee className="text-primary h-4 w-4" />
            <span className="text-xs">Medium & Dark Roasts</span>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold uppercase tracking-widest text-sm">Contact Us</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-primary" />
              <span>203 Fake St. Mountain View, San Francisco, California, USA</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-primary" />
              <span>+2 392 3929 210</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-primary" />
              <span>info@safaricoffee.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 container mt-16 pt-8 border-t border-primary/5 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Safari Roast. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <span className="text-gray-600">|</span>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
