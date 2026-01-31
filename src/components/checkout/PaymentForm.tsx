"use client";

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, FormEvent } from 'react';

interface PaymentFormProps {
    amount: number;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

export default function PaymentForm({ amount, onSuccess, onError }: PaymentFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage('');

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/checkout/success`,
                },
            });

            if (error) {
                setErrorMessage(error.message || 'An error occurred');
                onError?.(error.message || 'Payment failed');
            } else {
                onSuccess?.();
            }
        } catch (err: any) {
            setErrorMessage(err.message);
            onError?.(err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-zinc-900/50 p-6 border border-primary/10 rounded">
                <PaymentElement
                    options={{
                        layout: 'tabs',
                    }}
                />
            </div>

            {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded text-sm">
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="btn-primary w-full py-4 text-center text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        Processing...
                    </span>
                ) : (
                    `Pay $${amount.toFixed(2)}`
                )}
            </button>

            <p className="text-gray-500 text-xs text-center">
                Your payment is secured by Stripe
            </p>
        </form>
    );
}
