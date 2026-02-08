import { NextRequest, NextResponse } from "next/server";
import { createFirebaseAdminApp } from "@/core/services/firebase-admin";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    console.log("🟢 [TEST-AUTH] POST HIT");

    try {
        // 1. Read Header
        const authHeader = req.headers.get("Authorization");
        console.log("Header:", authHeader ? "PRESENT" : "MISSING");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ success: false, reason: "NO_HEADER" }, { status: 401 });
        }

        const idToken = authHeader.split("Bearer ")[1];

        // 2. Init Admin
        const app = createFirebaseAdminApp();
        const auth = app.auth();

        // 3. Verify
        try {
            const decodedToken = await auth.verifyIdToken(idToken);
            console.log("✅ Token Verified for:", decodedToken.uid);
            return NextResponse.json({
                success: true,
                uid: decodedToken.uid,
                email: decodedToken.email,
                iat: decodedToken.iat,
                exp: decodedToken.exp
            });
        } catch (verifyErr: any) {
            console.error("❌ Token Verification Failed:", verifyErr);
            return NextResponse.json({
                success: false,
                reason: "VERIFY_FAILED",
                message: verifyErr.message,
                code: verifyErr.code
            }, { status: 401 });
        }

    } catch (e: any) {
        console.error("❌ Fatal Test Error:", e);
        return NextResponse.json({
            success: false,
            reason: "FATAL_ERROR",
            message: e.message,
            stack: e.stack
        }, { status: 500 });
    }
}
