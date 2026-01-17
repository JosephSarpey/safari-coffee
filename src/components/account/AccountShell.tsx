"use client";

import { AccountSidebar } from "@/components/account/Sidebar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AccountShellProps {
    children: React.ReactNode;
    type: "user" | "company";
}

export function AccountShell({ children, type }: AccountShellProps) {
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const checkAuth = async () => {
            // If not authenticated in store, try to fetch profile (which will trigger refresh if cookie exists)
            if (!isAuthenticated) {
                try {
                    // This call will fail with 401 if no valid cookie, but if valid cookie exists (even if access token missing in store),
                    // the client interceptor will refresh and updated the store.
                    const { userApi } = await import("@/lib/api/user");
                    const userProfile = await userApi.getProfile();
                    useAuthStore.getState().updateUser(userProfile);
                } catch (e) {
                    router.push('/login');
                }
            }
        };

        checkAuth();
    }, [isMounted, isAuthenticated, router]);

    useEffect(() => {
        if (!isMounted) return;
        if (!isAuthenticated) return; // Wait for checkAuth to potentially fix state

        if (type === 'company' && user?.role !== 'COMPANY') {
            router.push('/account/user');
        } else if (type === 'user' && user?.role === 'COMPANY') {
            router.push('/account/company');
        }
    }, [isMounted, isAuthenticated, user, type, router]);

    if (!isMounted) {
        return null;
    }

    if (!isAuthenticated) return null;
    if (type === 'company' && user?.role !== 'COMPANY') return null;
    if (type === 'user' && user?.role === 'COMPANY') return null;

    return (
        <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-6 pb-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                {/* Sidebar - Sticky on Desktop */}
                <aside className="w-full md:w-auto md:sticky md:top-24 md:self-start z-30">
                    <AccountSidebar type={type} />
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 w-full min-w-0 space-y-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
