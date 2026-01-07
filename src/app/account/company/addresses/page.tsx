"use client";

import { useEffect, useState } from "react";
import { AccountSidebar } from "@/components/account/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Pencil, Trash2, Loader2, Star, Building2 } from "lucide-react";
import { toast } from "sonner";
import { addressApi, Address, CreateAddressData } from "@/lib/api/address";
import { AddressForm } from "@/components/account/AddressForm";
import { cn } from "@/lib/utils";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CompanyAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAddresses = async () => {
    try {
      const data = await addressApi.getAll();
      setAddresses(data);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleCreate = async (data: CreateAddressData) => {
    setActionLoading(true);
    try {
      await addressApi.create(data);
      await fetchAddresses();
      setIsAdding(false);
      toast.success("Location added successfully");
    } catch (error: any) {
      console.error("Failed to create address", error);
      toast.error(error.message || "Failed to add location");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (data: CreateAddressData) => {
    if (!editingId) return;
    setActionLoading(true);
    try {
      await addressApi.update(editingId, data);
      await fetchAddresses();
      setEditingId(null);
      toast.success("Location updated successfully");
    } catch (error: any) {
      console.error("Failed to update address", error);
      toast.error(error.message || "Failed to update location");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await addressApi.delete(id);
      await fetchAddresses();
      toast.success("Location deleted successfully");
    } catch (error: any) {
      console.error("Failed to delete address", error);
      toast.error(error.message || "Failed to delete location");
    } finally {
        setDeletingId(null);
    }
  };

  return (
    <div className="bg-black pt-6 pb-12 flex-1">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <AccountSidebar type="company" />

          <div className="flex-1 space-y-8">
            <div className="bg-stone-900/60 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-white/5 flex justify-between items-center"> 
              <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#c49b63]" />
                Company Locations
              </h1>
              {!isAdding && !editingId && (
                <Button 
                   onClick={() => setIsAdding(true)}
                   className="bg-[#c49b63] text-black hover:bg-[#b08b55]"
                >
                  <Plus className="w-4 h-4 mr-2" /> Add Location
                </Button>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : isAdding ? (
              <div className="bg-stone-900/60 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-lg animate-in fade-in slide-in-from-bottom-4">
                 <h2 className="text-lg font-bold text-white mb-6">Add New Location</h2>
                 <AddressForm 
                    onSubmit={handleCreate} 
                    onCancel={() => setIsAdding(false)} 
                    isLoading={actionLoading} 
                 />
              </div>
            ) : editingId ? (
               <div className="bg-stone-900/60 backdrop-blur-sm p-6 rounded-xl border border-white/5 shadow-lg animate-in fade-in slide-in-from-bottom-4">
                 <h2 className="text-lg font-bold text-white mb-6">Edit Location</h2>
                 <AddressForm 
                    initialData={addresses.find(a => a.id === editingId)}
                    onSubmit={handleUpdate} 
                    onCancel={() => setEditingId(null)} 
                    isLoading={actionLoading} 
                 />
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {addresses.length === 0 ? (
                    <div className="col-span-2 text-center py-12 text-stone-500 bg-stone-900/60 backdrop-blur-sm rounded-xl border border-white/5">
                        <Building2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No locations found. Add your HQ or branches.</p>
                    </div>
                ) : (
                    addresses.map((address) => (
                    <div 
                        key={address.id} 
                        className={cn(
                            "bg-stone-900/60 backdrop-blur-sm p-6 rounded-xl border shadow-lg relative group transition-all duration-300",
                            address.isDefault ? "border-[#c49b63]" : "border-white/5 hover:border-white/20"
                        )}
                    >
                        {address.isDefault && (
                            <div className="absolute top-4 right-4 text-[#c49b63] flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-[#c49b63]/10 px-2 py-1 rounded-full">
                                <Star className="w-3 h-3 fill-current" /> Main
                            </div>
                        )}
                        <div className="space-y-1 mb-6 text-stone-300">
                        <p className="text-white font-medium">{address.street}</p>
                        <p>{address.city}, {address.state} {address.postalCode}</p>
                        <p>{address.country}</p>
                        </div>
                        <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 border-white/10 text-white hover:bg-white/10"
                            onClick={() => setEditingId(address.id)}
                        >
                            <Pencil className="w-4 h-4 mr-2" /> Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                                variant="outline" 
                                size="sm"
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
                            >
                                <Trash2 className="w-4 h-4" /> 
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-zinc-950 border-white/10">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription className="text-stone-400">
                                This action cannot be undone. This will permanently delete this location.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-transparent text-white border-white/10 hover:bg-white/10 hover:text-white">Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(address.id)}
                                className="bg-red-600 text-white hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        </div>
                    </div>
                    ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
