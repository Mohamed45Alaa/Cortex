'use client';

import './globals.css';
import { NavigationGuard } from '@/components/auth/NavigationGuard';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // STANDARD LAYOUT: Renders children only.
    // RootGate is now moved to page.tsx
    return (
        <html lang="en">
            <body className="antialiased overflow-hidden bg-[#020617] text-white">
                <NavigationGuard>
                    {children}
                </NavigationGuard>
            </body>
        </html>
    );
}
