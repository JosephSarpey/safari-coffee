"use client";

import PageHeader from "@/components/shared/PageHeader";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <PageHeader title="Contact Us" subtitle="Contact" backgroundImage="/images/bg_1.jpg" />

      <section className="section-padding">
        <div className="container overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-primary/10 border border-primary/20">
            {/* Contact Details */}
            <div className="bg-zinc-900 p-12 space-y-12">
              <header className="space-y-4">
                <span className="font-nothing text-primary text-2xl tracking-widest">Contact</span>
                <h2 className="text-4xl font-black uppercase tracking-widest text-white leading-tight">
                  Get In Touch
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  We're here to help! Whether you have questions about our products or want to discuss a partnership, feel free to reach out.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Address</span>
                  </div>
                  <p className="text-sm text-gray-500">2389 Main Street Ste 100, Glastonbury, Hartford County, CT 06033, United States</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <Phone className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Phone</span>
                  </div>
                  <p className="text-sm text-gray-500">+1 8602643330</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <Mail className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Email</span>
                  </div>
                  <p className="text-sm text-gray-500">everaingroup@gmail.com</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-primary mb-2">
                    <Globe className="h-4 w-4" />
                    <span className="text-[10px] uppercase font-black tracking-widest">Website</span>
                  </div>
                  <a href="https://safari-roast.com" className="text-sm text-gray-500">safari-roast.com</a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="h-[400px] w-full bg-zinc-900 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2981.5882661877037!2d-72.60891542346475!3d41.71461437185347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e65416b6e45b4f%3A0x7a3c8c6e7c9b9c9a!2s2389%20Main%20St%20%23100%2C%20Glastonbury%2C%20CT%2006033%2C%20USA!5e0!3m2!1sen!2sin!4v1705987200000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(90%)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Safari Roast Location"
        />
      </section>
    </div>
  );
}
