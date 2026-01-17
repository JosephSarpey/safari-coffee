import { AccountShell } from "@/components/account/AccountShell";

export default function UserAccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AccountShell type="user">{children}</AccountShell>;
}
