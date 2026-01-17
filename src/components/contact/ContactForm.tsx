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

    // Formspree specific fields
    // _subject: The subject of the email
    // _replyto: The email to reply to (Formspree usually picks up 'email' automatically, but explicit is good)

    // We can map the 'subject' input to '_subject' if we want the email subject to match.
    // If the input is named 'subject', Formspree considers it a field.
    // If we append '_subject', Formspree uses it as the metadata subject.
    const subject = formData.get("subject") as string;
    if (subject) {
      formData.append("_subject", `New Contact: ${subject}`);
    } else {
      formData.append("_subject", "New Contact from Safari App");
    }

    try {
      const response = await fetch(`https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}`, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSuccess(true);
        localStorage.setItem("lastContactSubmission", Date.now().toString());

        // Reset after showing success message
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
              name="name"
              type="text"
              placeholder="Your Name"
              className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            />
            <input
              required
              name="email"
              type="email"
              placeholder="Your Email"
              className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            />
          </div>
          <input
            required
            name="subject"
            type="text"
            placeholder="Subject"
            className="w-full bg-zinc-900 border border-primary/10 px-6 py-4 text-white outline-none focus:border-primary transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          />
          <textarea
            required
            name="message"
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
