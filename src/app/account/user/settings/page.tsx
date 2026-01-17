"use client";


import { User, Mail, Phone, MapPin, Lock, Bell, Save, Globe } from "lucide-react";
import { countries } from "@/data/countries";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { fetchClient } from "@/lib/api/client";

export default function UserSettingsPage() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        country: "",
        gender: "",
        address: "", // Note: address handling might need adjustment if it's an array in backend
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
                name: data.name || "",
                email: data.email || "",
                phoneNumber: data.phoneNumber || "",
                country: data.country || "",
                gender: data.gender || "",
                address: data.addresses && data.addresses.length > 0 ?
                    `${data.addresses[0].street}, ${data.addresses[0].city}` : "",
            });
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async () => {
        try {
            await fetchClient("/user/profile", {
                method: "PATCH",
                body: JSON.stringify({
                    name: profile.name,
                    email: profile.email,
                    phoneNumber: profile.phoneNumber,
                    country: profile.country,
                    gender: profile.gender,
                })
            });
            toast.success("Profile updated successfully");
        } catch (error: any) {
            toast.error(error.message || "Failed to update profile");
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
        <div className="bg-black pt-6 pb-12 flex-1">
            <div className="flex-1 space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-serif font-bold text-white">Settings</h1>
                    <p className="text-stone-400 mt-1">Manage your account preferences</p>
                </div>

                {/* Profile Settings */}
                <div className="bg-[#111] rounded-xl shadow-lg border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <User className="w-5 h-5 text-[#c49b63]" />
                            Profile Information
                        </h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <input
                                        type="tel"
                                        value={profile.phoneNumber}
                                        onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Country / Region</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors appearance-none"
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

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Gender</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <select
                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors appearance-none"
                                        value={profile.gender}
                                        onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                    >
                                        <option value="" disabled>Select Gender</option>
                                        <option value="Male" className="bg-zinc-900">Male</option>
                                        <option value="Female" className="bg-zinc-900">Female</option>
                                        <option value="Other" className="bg-zinc-900">Other</option>
                                        <option value="Prefer not to say" className="bg-zinc-900">Prefer not to say</option>
                                    </select>
                                </div>
                            </div>
                            {/* Address field for display only or simple update if needed, but keeping simple for now as per plan focus on profile/security */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Default Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                    <input
                                        type="text"
                                        value={profile.address}
                                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                    />
                                </div>
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
                <div className="bg-[#111] rounded-xl shadow-lg border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Lock className="w-5 h-5 text-[#c49b63]" />
                            Security
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
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
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
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-300">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwords.confirmPassword}
                                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[#c49b63] focus:outline-none transition-colors"
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

                {/* Notification Preferences */}
                <div className="bg-[#111] rounded-xl shadow-lg border border-white/10 overflow-hidden">
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Bell className="w-5 h-5 text-[#c49b63]" />
                            Notifications
                        </h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                            <div>
                                <p className="font-medium text-white">Order Updates</p>
                                <p className="text-sm text-stone-400">Receive emails about your order status</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-stone-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#c49b63] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c49b63]"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                            <div>
                                <p className="font-medium text-white">Promotions & Offers</p>
                                <p className="text-sm text-stone-400">Receive emails about new products and sales</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-stone-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#c49b63] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c49b63]"></div>
                            </label>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
}
