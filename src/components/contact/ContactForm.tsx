"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate generic network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after showing success message
    setTimeout(() => {
        setIsSuccess(false);
        (e.target as HTMLFormElement).reset();
    }, 5000);
  };

  return (
    <div className="bg-black p-12 md:p-16 h-full flex flex-col justify-center">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="h-20 w-20 bg-primary/20 rounded-full flex items-center justify-center">
                <Check className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-widest text-white">Message Sent!</h3>
                <p className="text-gray-400">Thank you for contacting Safari Roast. We'll get back to you shortly.</p>
            </div>
            <button 
                onClick={() => setIsSuccess(false)}
                className="text-primary hover:text-white text-sm uppercase font-bold tracking-widest mt-8 transition-colors"
            >
                Send Another Message
            </button>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
                <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-6">Send a Message</h3>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              required
              type="text" 
              placeholder="Your Name" 
              className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors disabled:opacity-50"
              disabled={isSubmitting} 
            />
            <input 
              required
              type="email" 
              placeholder="Your Email" 
              className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors disabled:opacity-50" 
              disabled={isSubmitting}
            />
          </div>
          <input 
            required
            type="text" 
            placeholder="Subject" 
            className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors disabled:opacity-50" 
            disabled={isSubmitting}
          />
          <textarea 
            required
            rows={5} 
            placeholder="Message" 
            className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors resize-none disabled:opacity-50"
            disabled={isSubmitting}
          ></textarea>
          <button 
            type="submit" 
            className="btn-primary w-full py-5 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
                <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                </>
            ) : (
                <>
                    Send Message
                    <Send className="h-4 w-4" />
                </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
