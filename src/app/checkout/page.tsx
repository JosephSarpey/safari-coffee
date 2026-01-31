"use client";

import PageHeader from "@/components/shared/PageHeader";
import { useCartStore } from "@/store/cart-store";
import { useState, useEffect } from "react";
import { countries } from "@/data/countries";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import PaymentForm from "@/components/checkout/PaymentForm";
import { paymentApi } from "@/lib/api/payment";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";
import { userApi, Address } from "@/lib/api/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { items, totalPrice } = useCartStore();
    const { user, isAuthenticated } = useAuthStore();
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState<string>("");
    const [isLoadingIntent, setIsLoadingIntent] = useState(true);
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string>("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "United States of America",
        street: "",
        apartment: "",
        city: "",
        state: "",
        postalCode: "",
        companyName: "",
        notes: "",
    });

    const stripePromise = getStripe();

    // Fetch user data and addresses
    useEffect(() => {
        const fetchUserData = async () => {
            if (!isAuthenticated || !user) {
                setIsLoadingUserData(false);
                return;
            }

            try {
                setIsLoadingUserData(true);
                // Fetch user addresses
                const userAddresses = await userApi.getAddresses();
                setAddresses(userAddresses);

                // Pre-fill form with user data
                const nameParts = user.name?.split(" ") || ["", ""];
                const firstName = nameParts[0] || "";
                const lastName = nameParts.slice(1).join(" ") || "";

                setFormData((prev) => ({
                    ...prev,
                    firstName,
                    lastName,
                    email: user.email || "",
                    phone: user.phoneNumber || "",
                    companyName: user.companyName || "",
                    country: user.country || "United States of America",
                }));

                // Auto-select default address if exists
                const defaultAddress = userAddresses.find((addr) => addr.isDefault);
                if (defaultAddress) {
                    setSelectedAddressId(defaultAddress.id);
                    applyAddressToForm(defaultAddress);
                }
            } catch (error: any) {
                console.error("Error fetching user data:", error);
                toast.error("Failed to load your account information");
            } finally {
                setIsLoadingUserData(false);
            }
        };

        fetchUserData();
    }, [isAuthenticated, user]);

    // Create payment intent when component mounts and cart has items
    useEffect(() => {
        if (items.length > 0 && !isLoadingUserData) {
            createPaymentIntent();
        }
    }, [items.length, isLoadingUserData]);

    const applyAddressToForm = (address: Address) => {
        setFormData((prev) => ({
            ...prev,
            street: address.street,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            country: address.country,
        }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const addressId = e.target.value;
        setSelectedAddressId(addressId);

        if (addressId) {
            const selectedAddress = addresses.find((addr) => addr.id === addressId);
            if (selectedAddress) {
                applyAddressToForm(selectedAddress);
            }
        }
    };

    const createPaymentIntent = async () => {
        try {
            setIsLoadingIntent(true);
            const total = totalPrice();

            // Validate amount before sending to backend
            if (!total || total <= 0 || isNaN(total)) {
                console.error("Invalid total amount:", total);
                toast.error("Unable to calculate order total. Please try again.");
                setIsLoadingIntent(false);
                return;
            }

            const response = await paymentApi.createPaymentIntent({
                amount: total,
                currency: "usd",
                metadata: {
                    customerEmail: formData.email || user?.email || "customer@example.com",
                    customerName: `${formData.firstName} ${formData.lastName}`.trim() || user?.name || "",
                    userId: user?.id,
                    items: items.map((item) => ({
                        id: item.id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            });

            setClientSecret(response.clientSecret);
        } catch (error: any) {
            console.error("Error creating payment intent:", error);
            toast.error("Failed to initialize payment. Please try again.");
        } finally {
            setIsLoadingIntent(false);
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handlePaymentSuccess = () => {
        toast.success("Payment successful! Redirecting...");
    };

    const handlePaymentError = (error: string) => {
        toast.error(error || "Payment failed. Please try again.");
    };

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="bg-zinc-950 min-h-screen">
                <PageHeader title="Checkout" subtitle="Order" />
                <section className="section-padding container">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-white mb-4">Please Sign In</h2>
                        <p className="text-gray-400 mb-8">You need to be signed in to checkout.</p>
                        <Link href="/login" className="btn-primary inline-block">
                            Sign In
                        </Link>
                    </div>
                </section>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="bg-zinc-950 min-h-screen">
                <PageHeader title="Checkout" subtitle="Order" />
                <section className="section-padding container">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                        <p className="text-gray-400 mb-8">Add some items to your cart before checking out.</p>
                        <a href="/shop" className="btn-primary inline-block">
                            Continue Shopping
                        </a>
                    </div>
                </section>
            </div>
        );
    }

    // Show loading state while fetching user data
    if (isLoadingUserData) {
        return (
            <div className="bg-zinc-950 min-h-screen">
                <PageHeader title="Checkout" subtitle="Order" />
                <section className="section-padding container">
                    <div className="text-center py-20">
                        <div className="animate-spin text-4xl mb-4">⏳</div>
                        <p className="text-gray-400">Loading your information...</p>
                    </div>
                </section>
            </div>
        );
    }

    // Check if user has at least one address
    if (addresses.length === 0) {
        return (
            <div className="bg-zinc-950 min-h-screen">
                <PageHeader title="Checkout" subtitle="Order" />
                <section className="section-padding container">
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-zinc-900/50 p-10 border border-primary/10 text-center">
                            <div className="mb-8">
                                <div className="text-6xl mb-4">📍</div>
                                <h2 className="text-2xl font-bold text-white mb-4">
                                    Address Required
                                </h2>
                                <p className="text-gray-400 text-lg mb-2">
                                    You need to add a delivery address before you can checkout.
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Please add your address in your account settings and then return to complete your order.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/account/user/addresses"
                                    className="btn-primary inline-block text-center"
                                >
                                    Add Address
                                </Link>
                                <Link
                                    href="/shop"
                                    className="border border-primary text-primary px-8 py-3 rounded hover:bg-primary hover:text-zinc-950 transition-colors font-bold uppercase tracking-widest text-sm"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="bg-zinc-950 min-h-screen">
            <PageHeader title="Checkout" subtitle="Order" />

            <section className="section-padding container">
                <div className="lg:grid lg:grid-cols-2 gap-16">
                    {/* Billing Details */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold uppercase tracking-widest text-primary border-b border-primary/20 pb-4">
                            Billing Details
                        </h3>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors"
                                        placeholder="Doe"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Company Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors"
                                />
                            </div>

                            {/* Address Selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Select Address *
                                </label>
                                <select
                                    value={selectedAddressId}
                                    onChange={handleAddressChange}
                                    className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors bg-zinc-900"
                                    required
                                >
                                    <option value="">Choose an address</option>
                                    {addresses.map((address) => (
                                        <option key={address.id} value={address.id}>
                                            {address.street}, {address.city}, {address.state} {address.postalCode}
                                            {address.isDefault ? " (Default)" : ""}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-500">
                                    Need to add a new address?{" "}
                                    <Link href="/account/user/addresses" className="text-primary hover:underline">
                                        Manage addresses
                                    </Link>
                                </p>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Country / Region *
                                </label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors bg-zinc-900"
                                    required
                                >
                                    {countries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Street Address *
                                </label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors mb-2"
                                    placeholder="House number and street name"
                                    required
                                    readOnly
                                />
                                <input
                                    type="text"
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors"
                                    placeholder="Apartment, suite, unit, etc. (optional)"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                        Town / City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors"
                                        required
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors"
                                        required
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Postal Code *
                                </label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors"
                                    required
                                    readOnly
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Phone *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors"
                                    required
                                />
                            </div>

                            <div className="space-y-2 pt-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Order Notes (Optional)
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full bg-transparent border border-gray-800 p-4 text-white focus:border-primary outline-none transition-colors"
                                    placeholder="Notes about your order, e.g. special notes for delivery."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Your Order & Payment */}
                    <div className="mt-16 lg:mt-0">
                        <div className="bg-zinc-900/50 p-10 border border-primary/10">
                            <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-8">
                                Your Order
                            </h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between font-bold uppercase tracking-wider text-xs text-gray-500 border-b border-gray-800 pb-2">
                                    <span>Product</span>
                                    <span>Subtotal</span>
                                </div>
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between text-sm py-2 border-b border-gray-800/50"
                                    >
                                        <span className="text-gray-300">
                                            {item.name}{" "}
                                            <strong className="text-primary">× {item.quantity}</strong>
                                        </span>
                                        <span className="font-bold text-gray-300">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                <div className="flex justify-between text-sm py-4 border-b border-gray-800">
                                    <span className="font-bold text-white uppercase tracking-wider">
                                        Subtotal
                                    </span>
                                    <span className="font-bold text-primary">
                                        ${totalPrice().toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg py-4">
                                    <span className="font-bold text-white uppercase tracking-wider">
                                        Total
                                    </span>
                                    <span className="font-black text-primary text-2xl">
                                        ${totalPrice().toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="mb-8">
                                <h4 className="text-lg font-bold uppercase tracking-widest text-white mb-6 border-t border-gray-800 pt-6">
                                    Payment
                                </h4>

                                {isLoadingIntent ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin text-4xl mb-4">⏳</div>
                                        <p className="text-gray-400">Initializing payment...</p>
                                    </div>
                                ) : clientSecret && stripePromise ? (
                                    <Elements
                                        stripe={stripePromise}
                                        options={{
                                            clientSecret,
                                            appearance: {
                                                theme: 'night',
                                                variables: {
                                                    colorPrimary: '#d4af37',
                                                    colorBackground: '#18181b',
                                                    colorText: '#ffffff',
                                                    colorDanger: '#ef4444',
                                                    fontFamily: 'system-ui, sans-serif',
                                                    spacingUnit: '4px',
                                                    borderRadius: '4px',
                                                },
                                            },
                                        }}
                                    >
                                        <PaymentForm
                                            amount={totalPrice()}
                                            onSuccess={handlePaymentSuccess}
                                            onError={handlePaymentError}
                                        />
                                    </Elements>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-red-500 mb-4">
                                            Failed to load payment form
                                        </p>
                                        <button
                                            onClick={createPaymentIntent}
                                            className="btn-primary"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <p className="text-gray-500 text-xs">
                                    Your personal data will be used to process your order, support
                                    your experience throughout this website, and for other purposes
                                    described in our{" "}
                                    <a href="#" className="text-primary hover:underline">
                                        privacy policy
                                    </a>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
