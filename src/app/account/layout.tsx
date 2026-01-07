import { AccountNavbar } from "@/components/account/AccountNavbar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <AccountNavbar />
      {/* We don't add padding here if the pages manage their own layout structure, 
          but usually we want to offset the fixed header. 
          However, the user wants an 'ecommerce' look which often implies a sidebar layout 
          that might be full height.
          For now, let's just render children and let pages handle their own padding 
          relative to the fixed header, or add a base padding.
      */}
      <main className="pt-16 flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
