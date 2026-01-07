"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { countries } from "@/lib/countries";
import { CreateAddressData, Address } from "@/lib/api/address";

interface AddressFormProps {
  initialData?: Address;
  onSubmit: (data: CreateAddressData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

export function AddressForm({ initialData, onSubmit, onCancel, isLoading }: AddressFormProps) {
  const [formData, setFormData] = useState<CreateAddressData>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        street: initialData.street,
        city: initialData.city,
        state: initialData.state,
        postalCode: initialData.postalCode,
        country: initialData.country,
        isDefault: initialData.isDefault,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="street" className="text-xs uppercase tracking-widest text-gray-300">
          Street Address
        </Label>
        <Input
          id="street"
          required
          value={formData.street}
          onChange={handleChange}
          className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-xs uppercase tracking-widest text-gray-300">
            City
          </Label>
          <Input
            id="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state" className="text-xs uppercase tracking-widest text-gray-300">
            State / Province
          </Label>
          <Input
            id="state"
            required
            value={formData.state}
            onChange={handleChange}
            className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postalCode" className="text-xs uppercase tracking-widest text-gray-300">
            Postal Code
          </Label>
          <Input
            id="postalCode"
            required
            value={formData.postalCode}
            onChange={handleChange}
            className="bg-black/50 border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
            <Label htmlFor="country" className="text-xs uppercase tracking-widest text-gray-300">
              Country
            </Label>
            <select
              id="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 text-white placeholder:text-gray-600 focus:border-primary/50 focus:ring-primary/20 h-10 rounded-md px-3 appearance-none"
            >
                <option value="" disabled>Select Country</option>
                {countries.map((c) => (
                    <option key={c.code} value={c.name} className="bg-black text-white">{c.name}</option>
                ))}
            </select>
          </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => setFormData(prev => ({ ...prev, isDefault: e.target.checked }))}
          className="rounded bg-black/50 border-white/10 text-primary focus:ring-primary/20"
        />
        <Label htmlFor="isDefault" className="text-sm text-gray-300">
          Set as default address
        </Label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="border-white/10 text-white hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-primary text-black hover:bg-primary/90"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (initialData ? "Update Address" : "Add Address")}
        </Button>
      </div>
    </form>
  );
}
