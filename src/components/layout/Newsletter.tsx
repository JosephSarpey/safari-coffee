"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Rate Limiting Check
    const lastSubscription = localStorage.getItem("lastNewsletterSubscription");
    if (lastSubscription) {
      const timeSince = Date.now() - parseInt(lastSubscription);
      if (timeSince < 120000) { // 2 minutes
        toast.error("Please wait a few minutes before subscribing again.");
        return;
      }
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("message", "I would like to subscribe to the Safari Coffee newsletter to receive the latest news, updates, and exclusive offers.");
    formData.append("_subject", "New Newsletter Subscription");

    try {
      const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID}`, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Thank you for subscribing!");
        localStorage.setItem("lastNewsletterSubscription", Date.now().toString());
        setEmail("");

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        const data = await response.json();
        if (data.errors) {
          toast.error(data.errors.map((err: any) => err.message).join(", "));
        } else {
          toast.error("Subscription failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Failed to subscribe. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container pb-12 mb-12 border-b border-primary/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black uppercase tracking-widest text-white">Subscribe to our newsletter</h3>
          <p className="font-medium text-gray-400">Get the latest news and updates</p>
        </div>

        {isSuccess ? (
          <div className="flex items-center gap-4 text-primary animate-in fade-in slide-in-from-right-4">
            <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold uppercase tracking-widest text-sm">Thanks for subscribing!</span>
              <span className="text-gray-400 text-xs mt-0.5">You'll receive our latest updates in your inbox.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full md:w-auto max-w-xl">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email Address"
              className="w-full sm:w-80 bg-zinc-900/50 border border-zinc-700 px-6 py-4 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all disabled:opacity-50"
              disabled={isSubmitting}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-primary text-black px-8 py-4 uppercase font-bold text-sm tracking-widest hover:bg-primary/90 transition-colors whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
