"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { userApi } from "@/lib/api/user";
import { useAuthStore } from "@/store/auth-store";

/**
 * OAuth Callback Page
 * 
 * This page handles the redirect from backend OAuth authentication.
 * The backend sets an httpOnly cookie before redirecting here.
 * 
 * Flow:
 * 1. Backend authenticates with Google
 * 2. Backend sets httpOnly cookie with access_token
 * 3. Backend redirects to this page
 * 4. This page fetches the user profile (cookie sent automatically)
 * 5. User data is stored in auth store
 * 6. User is redirected to their account page
 */
export default function AuthCallbackPage() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const login = useAuthStore((state) => state.login);

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Fetch user profile - the httpOnly cookie is automatically sent
                const user = await userApi.getProfile();

                // Store user in auth store
                login(user);

                // Redirect based on user role
                const targetPath = user.role === 'COMPANY' ? '/account/company' : '/account/user';
                router.replace(targetPath);
            } catch (err: any) {
                console.error("OAuth callback error:", err);
                setError(err.message || "Authentication failed. Please try again.");

                // Redirect to login after a delay
                setTimeout(() => {
                    router.replace('/login');
                }, 3000);
            }
        };

        handleCallback();
    }, [router, login]);

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center max-w-md px-6">
                    <p className="text-red-400 mb-4">{error}</p>
                    <p className="text-stone-400 text-sm">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
                <p className="text-white">Completing sign in...</p>
            </div>
        </div>
    );
}
