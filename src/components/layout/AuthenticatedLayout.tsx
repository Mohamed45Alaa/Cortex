import { ReactNode } from 'react';
import { NavigationGuard } from '@/components/auth/NavigationGuard';
import { ControlLayout } from '@/components/dashboard/ControlLayout';
// Minimal AuthenticatedLayout to satisfy imports
export default function AuthenticatedLayout({ children }: { children: ReactNode }) {
    return (
        <NavigationGuard>
            {children}
        </NavigationGuard>
    );
}
