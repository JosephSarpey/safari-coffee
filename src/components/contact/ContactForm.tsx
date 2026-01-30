"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate Limiting Check
    const lastSubmission = localStorage.getItem("lastContactSubmission");
    if (lastSubmission) {
      const timeSince = Date.now() - parseInt(lastSubmission);
      if (timeSince < 120000) { // 2 minutes
        toast.error("Please wait a few minutes before sending another message.");
        return;
      }
    }

    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const subject = formData.get("subject") as string;
    if (subject) {
      formData.append("_subject", `New Contact: ${subject}`);
    } else {
      formData.append("_subject", "New Contact from Safari App");
    }

    try {
      const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_FORM_ID}`, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        localStorage.setItem("lastContactSubmission", Date.now().toString());

        setTimeout(() => {
          setIsSuccess(false);
          form.reset();
        }, 5000);
      } else {
        const data = await response.json();
        if (data.errors) {
          toast.error(data.errors.map((err: any) => err.message).join(", "));
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black p-6 sm:p-10 md:p-12 lg:p-16 h-full flex flex-col justify-center">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="h-16 w-16 sm:h-20 sm:w-20 bg-primary/20 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-white">Message Sent!</h3>
            <p className="text-gray-400 text-sm sm:text-base">Thank you for contacting Safari Roast. We'll get back to you shortly.</p>
          </div>
          <button
            onClick={() => setIsSuccess(false)}
            className="text-primary hover:text-white text-sm uppercase font-bold tracking-widest mt-8 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-white mb-4 sm:mb-6">Send a Message</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <input
              required
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full bg-zinc-900 border border-primary/10 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base text-white outline-none focus:border-primary transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            />
            <input
              required
              name="email"
              type="email"
              placeholder="Your Email"
              className="w-full bg-zinc-900 border border-primary/10 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base text-white outline-none focus:border-primary transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            />
          </div>
          <input
            required
            name="subject"
            type="text"
            placeholder="Subject"
            className="w-full bg-zinc-900 border border-primary/10 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base text-white outline-none focus:border-primary transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          />
          <textarea
            required
            name="message"
            rows={4}
            placeholder="Message"
            className="w-full bg-zinc-900 border border-primary/10 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base text-white outline-none focus:border-primary transition-colors resize-none disabled:opacity-50"
            disabled={isSubmitting}
          ></textarea>

          <button
            type="submit"
            className="btn-primary w-full py-4 sm:py-5 text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
