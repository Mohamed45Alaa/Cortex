"use client";

import React from 'react';
import { useStore } from '@/store/useStore';
import { SessionTimerView } from '@/components/layout/SessionTimerView';
import { ControlLayout } from '@/components/dashboard/ControlLayout';
import { useRouter, useParams } from 'next/navigation';

export default function SessionPage() {
    const params = useParams();
    const router = useRouter();
    const { activeSession, lectures } = useStore();
    const sessionId = params.id as string;

    // TODO: Verify session match in Phase 2/3

    // Mock allocated time retrieval (needs Store to support "getAllocatedTime" or similar if not in activeSession)
    const allocatedMinutes = activeSession?.expectedDuration || 60;

    return (
        <ControlLayout
            currentView="STUDY_EXECUTION"
            onNavigate={() => router.push('/dashboard')}
            lang="en" // TODO: Connect to global language state
            onToggleLang={() => { }}
            theme="dark"
            onToggleTheme={() => { }}
        >
            <SessionTimerView
                allocatedMinutes={allocatedMinutes}
                lectureId={activeSession?.lectureId || 'unknown'}
                subjectId={activeSession?.subjectId || 'unknown'}
                lang="en"
                onComplete={(session) => {
                    console.log("Session complete", session);
                    router.push('/dashboard');
                }}
            />
        </ControlLayout>
    );
}
