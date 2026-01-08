import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Academic Cognitive Control System",
    description: "Medical-grade academic self-regulation.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
