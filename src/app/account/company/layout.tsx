import { AccountShell } from "@/components/account/AccountShell";

export default function CompanyAccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AccountShell type="company">{children}</AccountShell>;
}
