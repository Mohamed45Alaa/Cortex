import { NextResponse } from 'next/server';
import { BackupService } from '@/core/services/BackupService';
import { AdminLogger } from '@/core/services/AdminLogger';

export async function POST(req: Request) {
    try {
        const { undoToken } = await req.json();

        if (!undoToken) {
            return NextResponse.json({ error: 'Undo Token required' }, { status: 400 });
        }

        // 1. Decode & Validate Token
        let tokenData;
        try {
            const jsonStr = Buffer.from(undoToken, 'base64').toString('utf-8');
            tokenData = JSON.parse(jsonStr);
        } catch (e) {
            return NextResponse.json({ error: 'Invalid Token' }, { status: 400 });
        }

        const { uid, snapshotId, expiresAt } = tokenData;

        // Check Expiry
        if (Date.now() > expiresAt) {
            return NextResponse.json({ error: 'Undo Token Expired' }, { status: 400 });
        }

        console.log(`[API] Starting UNDO for ${uid} from snapshot ${snapshotId}`);

        // 2. Restore Snapshot
        const success = await BackupService.restoreSnapshot(uid, snapshotId);

        if (!success) {
            return NextResponse.json({ error: 'Restore Failed' }, { status: 500 });
        }

        // 3. Log
        await AdminLogger.logAction({
            performedBy: 'user',
            targetUid: uid,
            type: 'UNDO_RESET',
            timestamp: Date.now(),
            undoToken
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('[API] Undo Reset Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
