"use client";

import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("@/components/shared/ChatWidget"), {
    ssr: false,
});

const CookieConsent = dynamic(() => import("@/components/layout/CookieConsent"), {
    ssr: false,
});

export default function ClientFeatures() {
    return (
        <>
            <CookieConsent />
            <ChatWidget />
        </>
    );
}
