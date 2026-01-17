"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from "lucide-react";

interface WelcomeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function WelcomeDialog({ open, onOpenChange }: WelcomeDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="bg-zinc-950 border-white/10 max-w-md">
                <AlertDialogHeader className="items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <AlertDialogTitle className="text-2xl font-bold text-white uppercase tracking-widest">
                        Welcome to Safari Coffee
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400 text-base">
                        Your account has been successfully created. We're excited to have you join our coffee journey. Please sign in to continue.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center mt-6">
                    <AlertDialogAction
                        onClick={() => onOpenChange(false)}
                        className="w-full sm:w-auto min-w-[140px] bg-primary text-black hover:bg-primary/90 uppercase tracking-widest font-bold text-xs"
                    >
                        Continue to Sign In
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
