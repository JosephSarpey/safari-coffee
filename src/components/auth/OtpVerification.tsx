import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { authApi } from "@/lib/api/auth";

interface OtpVerificationProps {
    email: string;
    onSuccess: (data: any) => void;
}

export function OtpVerification({ email, onSuccess }: OtpVerificationProps) {
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const data = await authApi.verifyOtp({ email, otp });
            onSuccess(data);
        } catch (err: any) {
            setError(err.message || "Invalid OTP");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-2">
                    Verification Required
                </h2>
                <p className="text-gray-400 text-sm">
                    We've sent a code to <br />
                    <span className="text-white font-mono">{email}</span>
                </p>
            </div>

            {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="otp" className="text-xs uppercase tracking-widest text-gray-300">
                        Enter Code
                    </Label>
                    <Input
                        id="otp"
                        type="text"
                        placeholder="--- ---"
                        required
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
                        className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-12 text-center text-2xl tracking-widest font-mono"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className="w-full h-12 bg-primary text-black hover:bg-primary/90 uppercase tracking-widest font-bold text-sm transition-all"
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Verify"
                    )}
                </Button>
            </form>
        </div>
    );
}
