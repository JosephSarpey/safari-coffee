export const countries = [
  { name: "United States", code: "US", phone: "+1" },
  { name: "United Kingdom", code: "GB", phone: "+44" },
  { name: "Canada", code: "CA", phone: "+1" },
  { name: "Australia", code: "AU", phone: "+61" },
  { name: "Germany", code: "DE", phone: "+49" },
  { name: "France", code: "FR", phone: "+33" },
  { name: "Japan", code: "JP", phone: "+81" },
  { name: "China", code: "CN", phone: "+86" },
  { name: "India", code: "IN", phone: "+91" },
  { name: "Brazil", code: "BR", phone: "+55" },
  { name: "Mexico", code: "MX", phone: "+52" },
  { name: "South Africa", code: "ZA", phone: "+27" },
  { name: "Nigeria", code: "NG", phone: "+234" },
  { name: "Kenya", code: "KE", phone: "+254" },
  { name: "Singapore", code: "SG", phone: "+65" },
  // Add more as needed
].sort((a, b) => a.name.localeCompare(b.name));
