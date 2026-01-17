"use client";


import { Building2, Mail, Phone, MapPin, Lock, FileText, Save, Globe } from "lucide-react";
import { countries } from "@/data/countries";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { fetchClient } from "@/lib/api/client";

export default function CompanySettingsPage() {
    const [profile, setProfile] = useState({
        companyName: "",
        name: "", // Contact Name
        email: "",
        phoneNumber: "",
        country: "",
        address: "",
        taxId: "", // Not persistent in current schema
        website: "", // Not persistent in current schema
    });
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await fetchClient("/user/profile");
            setProfile({
                companyName: data.companyName || "",
                name: data.name || "",
                email: data.email || "",
                phoneNumber: data.phoneNumber || "",
                country: data.country || "",
                address: data.addresses && data.addresses.length > 0 ?
                    `${data.addresses[0].street}, ${data.addresses[0].city}` : "",
                taxId: "", // Placeholder
                website: "", // Placeholder
            });
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async () => {
        try {
            // Note: taxId and website are not sent as they are not in schema
            await fetchClient("/user/profile", {
                method: "PATCH",
                body: JSON.stringify({
                    companyName: profile.companyName,
                    name: profile.name,
                    phoneNumber: profile.phoneNumber,
                    country: profile.country,
                })
            });
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    const handlePasswordUpdate = async () => {
        if (passwords.newPassword !== passwords.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }
        try {
            await fetchClient("/user/change-password", {
                method: "POST",
                body: JSON.stringify({
                    oldPassword: passwords.currentPassword,
                    newPassword: passwords.newPassword
                })
            });
            toast.success("Password updated successfully");
            setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error: any) {
            toast.error(error.message || "Failed to update password");
        }
    };


    return (
        <>
            <div className="flex-1 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white">Company Settings</h1>
                    <p className="text-stone-400 mt-1">Manage your business profile and preferences</p>
                </div>

                {/* Company Information */}
                <div className="bg-stone-900/60 backdrop-blur-sm rounded-xl shadow-xl border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-[#c49b63]" />
                            Company Details
                        </h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Company Name</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <input
                                        type="text"
                                        value={profile.companyName}
                                        onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Tax ID / VAT Number</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <input
                                        type="text"
                                        value={profile.taxId}
                                        onChange={(e) => setProfile({ ...profile, taxId: e.target.value })}
                                        placeholder="Optional (Not saved)"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Website</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <input
                                        type="url"
                                        value={profile.website}
                                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                        placeholder="Optional (Not saved)"
                                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Headquarters Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <input
                                        type="text"
                                        value={profile.address}
                                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Country / Region</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <select
                                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors appearance-none"
                                        value={profile.country}
                                        onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                                    >
                                        <option value="" disabled>Select a country</option>
                                        {countries.map((country) => (
                                            <option key={country} value={country} className="bg-zinc-900">{country}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Person */}
                <div className="bg-stone-900/60 backdrop-blur-sm rounded-xl shadow-xl border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Mail className="w-5 h-5 text-[#c49b63]" />
                            Primary Contact
                        </h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Contact Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Email Address</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    readOnly
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-stone-400 cursor-not-allowed focus:outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Phone Number</label>
                                <input
                                    type="tel"
                                    value={profile.phoneNumber}
                                    onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button
                                onClick={handleProfileUpdate}
                                className="flex items-center gap-2 bg-[#c49b63] text-black font-bold px-6 py-2.5 rounded-full hover:bg-white transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-stone-900/60 backdrop-blur-sm rounded-xl shadow-xl border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Lock className="w-5 h-5 text-[#c49b63]" />
                            Account Security
                        </h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Current Password</label>
                                <input
                                    type="password"
                                    value={passwords.currentPassword}
                                    onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">New Password</label>
                                <input
                                    type="password"
                                    value={passwords.newPassword}
                                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button
                                onClick={handlePasswordUpdate}
                                className="flex items-center gap-2 bg-stone-800 text-white font-medium px-6 py-2.5 rounded-full hover:bg-stone-700 transition-colors border border-white/10"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
}
