import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

/**
 * Diagnostic Endpoint
 * 
 * Returns system health information for debugging:
 * - Next.js version
 * - Turbopack status
 * - Runtime environment
 * - Session gate state (if token provided)
 */
export async function GET(req: NextRequest) {
    try {
        // Basic environment info
        const diagnostic = {
            timestamp: new Date().toISOString(),
            nextVersion: process.env.npm_package_dependencies_next || 'Unknown',
            nodeVersion: process.version,
            platform: process.platform,
            turbopackEnabled: false, // Hardcoded - Turbopack disabled in package.json
            runtime: 'nodejs', // Hardcoded - We use Node.js runtime
            environment: process.env.NODE_ENV || 'development',
        };

        // Optional: Session state if authenticated
        const authHeader = req.headers.get("Authorization");
        if (authHeader && authHeader.startsWith("Bearer ")) {
            try {
                const { createFirebaseAdminApp } = await import('@/core/services/firebase-admin');
                const adminApp = createFirebaseAdminApp();
                const auth = adminApp.auth();
                const rtdb = adminApp.database();

                const idToken = authHeader.split("Bearer ")[1];
                const decodedToken = await auth.verifyIdToken(idToken);
                const uid = decodedToken.uid;

                // Check RTDB for active session
                const statusRef = rtdb.ref(`status/${uid}`);
                const statusSnap = await statusRef.get();
                const statusData = statusSnap.val();

                (diagnostic as any).sessionState = {
                    hasActiveSession: !!statusData?.activeSession,
                    sessionId: statusData?.activeSession?.sessionId || null,
                    lastSeenAt: statusData?.lastSeenAt || null,
                    isTerminated: !!statusData?.sessionTermination,
                };
            } catch (authError) {
                (diagnostic as any).sessionState = {
                    error: 'Auth failed or session unavailable'
                };
            }
        }

        return NextResponse.json({
            success: true,
            diagnostic
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
