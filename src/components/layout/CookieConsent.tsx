"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConcent');
    if (!consent) {
      setShowConsent(true);
    } else {
        // Load saved preferences if available
        const savedPrefs = localStorage.getItem('cookiePreferences');
        if (savedPrefs) {
            setPreferences(JSON.parse(savedPrefs));
        }
    }
  }, []);

  const acceptAll = () => {
    const allEnabled = { essential: true, analytics: true, marketing: true };
    localStorage.setItem('cookieConcent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(allEnabled));
    setPreferences(allEnabled);
    setShowConsent(false);
    setShowPreferences(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookieConcent', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setShowConsent(false);
    setShowPreferences(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'essential') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showConsent && !showPreferences) return null;

  return (
    <>
      {/* Main Banner */}
      {showConsent && !showPreferences && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/95 text-white border-t border-primary/20 shadow-lg animate-in slide-in-from-bottom">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-300 pr-8">
              <p>
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. 
                For more information, please visit our{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0 flex-wrap justify-center md:justify-end">
              <button
                onClick={() => setShowPreferences(true)}
                className="text-sm text-gray-300 hover:text-white underline decoration-dotted underline-offset-4 transition-colors"
              >
                Manage Preferences
              </button>
              <button
                onClick={acceptAll}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Accept All
              </button>
              <button
                onClick={() => setShowConsent(false)}
                className="p-1 hover:text-primary transition-colors md:hidden"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white text-gray-900 rounded-lg max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-xl font-bold">Cookie Preferences</h3>
              <button onClick={() => setShowPreferences(false)} className="text-gray-500 hover:text-black">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Essential Cookies</p>
                  <p className="text-xs text-gray-500">Required for the website to function.</p>
                </div>
                <div className="w-10 h-6 bg-primary rounded-full relative opacity-50 cursor-not-allowed">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Analytics</p>
                  <p className="text-xs text-gray-500">Help us understand how you use our site.</p>
                </div>
                <button 
                  onClick={() => togglePreference('analytics')}
                  className={`w-10 h-6 rounded-full relative transition-colors ${preferences.analytics ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences.analytics ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Marketing</p>
                  <p className="text-xs text-gray-500">Used to deliver relevant advertisements.</p>
                </div>
                <button 
                  onClick={() => togglePreference('marketing')}
                  className={`w-10 h-6 rounded-full relative transition-colors ${preferences.marketing ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences.marketing ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={acceptAll}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-black border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                Accept All
              </button>
              <button 
                onClick={savePreferences}
                className="px-6 py-2 text-sm font-semibold text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
