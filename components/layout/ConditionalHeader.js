'use client';
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";

export default function ConditionalHeader() {
    const pathname = usePathname();
    const isAuthPage = pathname?.startsWith('/auth');

    if (isAuthPage) {
        return null;
    }

    return <Header />;
}