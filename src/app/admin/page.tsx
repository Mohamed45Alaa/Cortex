"use client";

import React from 'react';
// Assuming AdminView exists or needs to be extracted
// import { AdminView } from '@/components/admin/AdminView'; 
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();

    return (
        <div className="p-8 text-white">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p>Admin features will be migrated here.</p>
            <button onClick={() => router.push('/dashboard')} className="mt-4 px-4 py-2 bg-blue-600 rounded">
                Back to Dashboard
            </button>
        </div>
    );
}
