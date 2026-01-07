"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ArrowRight } from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { countries } from "@/lib/countries";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      country: '',
      gender: '',
      phoneCode: '',
      phone: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
        await authApi.signup({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            country: formData.country,
            gender: formData.gender,
            phoneNumber: `${formData.phoneCode} ${formData.phone}`,
            role: 'CUSTOMER'
        });

        // Handle success
        window.location.href = '/login?registered=true';
    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-24 pb-12">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/auth_bg.png"
          alt="Coffee Background"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 w-full max-w-md p-8 md:p-12 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md animate-in fade-in zoom-in-95 duration-500 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold uppercase tracking-widest mb-2 text-primary">
            Join the Safari
          </h1>
          <p className="text-gray-400 text-sm">
            Create your account to start your coffee journey
          </p>
        </div>

        {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              required
              value={formData.name}
              onChange={handleChange}
              className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs uppercase tracking-widest text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12"
            />
          </div>


          <div className="space-y-2">
            <Label htmlFor="country" className="text-xs uppercase tracking-widest text-gray-300">
              Country
            </Label>
            <select
              id="country"
              required
              value={formData.country}
              onChange={(e) => {
                  const country = countries.find(c => c.name === e.target.value);
                  setFormData({ ...formData, country: e.target.value, phoneCode: country?.phone || '' });
              }}
              className="w-full bg-black/50 border border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12 rounded-md px-3 appearance-none"
            >
                <option value="" disabled>Select Country</option>
                {countries.map((c) => (
                    <option key={c.code} value={c.name} className="bg-black text-white">{c.name}</option>
                ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender" className="text-xs uppercase tracking-widest text-gray-300">
              Gender
            </Label>
            <select
              id="gender"
              required
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full bg-black/50 border border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12 rounded-md px-3 appearance-none"
            >
                <option value="" disabled>Select Gender</option>
                <option value="male" className="bg-black text-white">Male</option>
                <option value="female" className="bg-black text-white">Female</option>
                <option value="other" className="bg-black text-white">Other</option>
            </select>
          </div>

           <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-gray-300">
              Phone Number
            </Label>
            <div className="flex gap-2">
                <select
                    value={formData.phoneCode}
                    onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                    className="w-24 bg-black/50 border border-white/10 text-white focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12 rounded-md px-2 appearance-none"
                >
                     <option value="" disabled>Code</option>
                     {countries.map((c) => (
                        <option key={c.code} value={c.phone} className="bg-black text-white">{c.code} ({c.phone})</option>
                    ))}
                </select>
                <Input
                id="phone"
                type="tel"
                placeholder="123 456 7890"
                required
                value={formData.phone}
                onChange={handleChange}
                className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 md:h-12 flex-1"
                />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary text-black hover:bg-primary/90 uppercase tracking-widest font-bold text-sm transition-all"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black/40 px-2 text-gray-400 backdrop-blur-md">
                Or join with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white uppercase tracking-widest font-bold text-sm transition-all"
            onClick={() => window.location.href = 'http://localhost:5000/auth/google'}
          >
             <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Google
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-white transition-colors uppercase tracking-wider font-semibold">
            Sign In
          </Link>
        </div>
        
        <div className="mt-4 text-center">
            <Link href="/join" className="text-xs text-gray-600 hover:text-gray-400 transition-colors flex items-center justify-center gap-1 group">
                <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to selection
            </Link>
        </div>
      </div>
    </div>
  );
}
